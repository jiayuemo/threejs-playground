import "./style.css";

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  ACESFilmicToneMapping,
  sRGBEncoding,
  PMREMGenerator,
  FloatType,
  TextureLoader,
  PCFSoftShadowMap,
  PointLight,
} from 'three';
import {
  RGBELoader,
  OrbitControls
} from 'three-stdlib';

import { generateCloudMesh } from './components/clouds/';
import { generateSeaMesh } from './components/sea';
import { generateContainerMesh, generateFloorMesh } from "./components/boundaries";
import { generateTileMesh } from './components/tiles';


/**
 * Define the scene - highest level
 */
const scene = new Scene();
scene.background = new Color("#FFEECC");

/**
 * Define the camera
 */
const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(-17, 31, 33);
// camera.position.set(0, 0, 50);

/**
 * Define renderer and its properties - the meat
 */
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);

// physical values computed by renderer can be displayed by monitor
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputEncoding = sRGBEncoding;

renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/**
 * Define the light element of the scene
 */
const light = new PointLight(new Color("#FFCB8E").convertSRGBToLinear().convertSRGBToLinear(), 80, 200);
light.position.set(10, 20, 10);

light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

/**
 * Define the controls so that a user can interact + redraw the focus
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
// Smoothen out movement when rotating scene around
controls.dampingFactor = 0.05;
controls.enableDamping = true;

/**
 * Use a JS Immediately Invoked Function Expression
 */
(async function() {
  // Process the env map so that we can use them in our materials
  const pmrem = new PMREMGenerator(renderer);
  const envMapTexture = await new RGBELoader().setDataType(FloatType).loadAsync("assets/envmap.hdr");
  const envMap = pmrem.fromEquirectangular(envMapTexture).texture;

  const textures = {
    dirt: await new TextureLoader().loadAsync("assets/dirt.png"),
    dirt2: await new TextureLoader().loadAsync("assets/dirt2.jpg"),
    grass: await new TextureLoader().loadAsync("assets/grass.jpg"),
    sand: await new TextureLoader().loadAsync("assets/sand.jpg"),
    water: await new TextureLoader().loadAsync("assets/water.jpg"),
    stone: await new TextureLoader().loadAsync("assets/stone.png"),
    snow: await new TextureLoader().loadAsync("assets/snow.png"),
  };

  const tiles = generateTileMesh(textures, envMap);
  scene.add(
    tiles.stone,
    tiles.grass,
    tiles.dirt,
    tiles.dirt2,
    tiles.sand,
    tiles.snow
  );

  const clouds = generateCloudMesh(envMap);
  scene.add(clouds);

  const seaMesh = generateSeaMesh(textures.water, envMap);
  scene.add(seaMesh);

  const mapContainer = generateContainerMesh(textures.dirt, envMap);
  scene.add(mapContainer);

  const mapFloor = generateFloorMesh(textures.dirt2, envMap);
  scene.add(mapFloor);

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
})();

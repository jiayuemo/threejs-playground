import "./style.css";

import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  ACESFilmicToneMapping,
  sRGBEncoding,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  FloatType,
  CylinderGeometry,
  BoxGeometry,
  Vector2,
  TextureLoader,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  PointLight,
  DoubleSide
} from 'https://cdn.skypack.dev/three@0.137';
import {
  RGBELoader
} from 'https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/RGBELoader';
import {
  OrbitControls
} from 'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls';
import {
  mergeBufferGeometries
} from 'https://cdn.skypack.dev/three-stdlib@2.8.5/utils/BufferGeometryUtils';
import {
  SimplexNoise
} from 'https://cdn.skypack.dev/simplex-noise';

import { generateCloudMesh } from './components/clouds/';
import { generateSeaMesh } from './components/sea';
import { generateContainerMesh, generateFloorMesh } from "./components/boundaries";
import {
  snowmanSpheres,
  stoneSphere,
  treePyramids
} from './components/doodles';


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
 * Define some height constants used for hexagon tiles
 */
const MAX_HEIGHT = 10;
const HEIGHT_CONSTANTS = {
  SNOW: MAX_HEIGHT * 0.9,
  STONE: MAX_HEIGHT * 0.8,
  DIRT: MAX_HEIGHT * 0.7,
  GRASS: MAX_HEIGHT * 0.5,
  SAND: MAX_HEIGHT * 0.3,  
  DIRT2: MAX_HEIGHT * 0,
};

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

  const tiles = createTiles(textures, envMap);
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

function tileToPositon(tileX, tileY) {
  // X position: A * B
  // A term represents the passed in X coordinate, center
  //  add 0.5 ONLY when X coordinate is odd to create an alternate effect
  // B term represents the spacing between tile centers in x axis
  // Y position: C * D
  // C term represents the passed in Y coordinate, center
  // D term represents the spacing between tile centers in y axis

  return new Vector2(
    (tileX + (tileY % 2) * 0.5) * 1.77,
    tileY * 1.535
  );
}


/**
 * Hexagon Mesh logic
 */
// make a single mesh containing all hexagon geometries
// to minimize gpu draw calls per frame; performance benefit
function createHexagonGeometries() {
  const simplex = new SimplexNoise();
  const hexagonGeometries = {
    stone: new BoxGeometry(0,0,0),
    dirt: new BoxGeometry(0,0,0),
    dirt2: new BoxGeometry(0,0,0),
    sand: new BoxGeometry(0,0,0),
    grass: new BoxGeometry(0,0,0),
    snow: new BoxGeometry(0,0,0),
  };
  let nextGeo;
  let nextGeoPosition;
  let nextGeoHeight;
  for(let i = -10; i <= 10; i++) {
    for (let j = -10; j <= 10; j++) {
      nextGeoPosition = tileToPositon(i, j);
      // only add next hexagon to geometry if it is inside of a circle with radius 16
      if (nextGeoPosition.length() < 16) {
        // Simplex Noise Library generates *smoothly* varied numbers, its output: -1 < output < 1 
        // Normalize the output of the simplex library call output between 0 - 1
        // Apply Math.power to emphasize heights of mountains
        nextGeoHeight = Math.pow(
          (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5,
          1.5
        ) * MAX_HEIGHT;

        nextGeo = hexGeometry(nextGeoHeight, nextGeoPosition);
        if (nextGeoHeight > HEIGHT_CONSTANTS.SNOW) {
          hexagonGeometries.snow = mergeBufferGeometries([hexagonGeometries.snow, nextGeo]);
          if (Math.random() > 0.4) {
            hexagonGeometries.snow = mergeBufferGeometries([hexagonGeometries.snow, snowmanSpheres(nextGeoHeight,nextGeoPosition)]);
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.STONE) {
          hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, nextGeo]);
          // spawn stones by merging stone hexagon geometry with stone sphere geometry randomly
          if (Math.random() > 0.8) {
            hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, stoneSphere(nextGeoHeight, nextGeoPosition)]);
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.DIRT) {
          hexagonGeometries.dirt = mergeBufferGeometries([hexagonGeometries.dirt, nextGeo]);
          if (Math.random() > 0.6 && hexagonGeometries.grass) {
            hexagonGeometries.grass = mergeBufferGeometries([hexagonGeometries.grass, treePyramids(nextGeoHeight, nextGeoPosition)]);
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.GRASS) {
          hexagonGeometries.grass = mergeBufferGeometries([hexagonGeometries.grass, nextGeo]);
          if (Math.random() > 0.6) {
            hexagonGeometries.grass = mergeBufferGeometries([hexagonGeometries.grass, treePyramids(nextGeoHeight, nextGeoPosition)]);
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.SAND) {
          hexagonGeometries.sand = mergeBufferGeometries([hexagonGeometries.sand, nextGeo]);
          // create stone spheres on top of sand hexagons,
          // this uses sand hexagon position as a starting off point
          // if you did not render sand hexagons these stone spheres look like they float in space with no hexagon under them
          if (Math.random() > 0.8 && hexagonGeometries.stone) {
            hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, stoneSphere(nextGeoHeight, nextGeoPosition)]);
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.DIRT2) {
          hexagonGeometries.dirt2 = mergeBufferGeometries([hexagonGeometries.dirt2, nextGeo]); 
          if (Math.random() > 0.8 && hexagonGeometries.stone) {
            hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, stoneSphere(nextGeoHeight, nextGeoPosition)]);
          }
        }
      }
    }
  }
  return hexagonGeometries;
}

function hexGeometry(height, position) {
  const geo = new CylinderGeometry(1,1, height, 6, 1, false);
  geo.translate(position.x, height * 0.5, position.y);
  return geo;
}

function createHexagonMesh(geometry, texture, enviornmentMap) {
  const material = new MeshPhysicalMaterial({
    envMap: enviornmentMap,
    // envMapIntensity: 1,
    envMapIntensity: 0.135,
    flatShading: true,
    map: texture
  });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createTiles(textures, envMap) {
  const hexagonGeometries = createHexagonGeometries();
  // Each hexagon mesh contains all <property> hexagons, for performance reasons
  const hexagonMeshes = {
    stone: createHexagonMesh(hexagonGeometries.stone, textures.stone, envMap),
    grass: createHexagonMesh(hexagonGeometries.grass, textures.grass, envMap),
    dirt: createHexagonMesh(hexagonGeometries.dirt, textures.dirt, envMap),
    dirt2: createHexagonMesh(hexagonGeometries.dirt2, textures.dirt2, envMap),
    sand: createHexagonMesh(hexagonGeometries.sand, textures.sand, envMap),
    snow: createHexagonMesh(hexagonGeometries.snow, textures.snow, envMap),
  };

  return hexagonMeshes;
}

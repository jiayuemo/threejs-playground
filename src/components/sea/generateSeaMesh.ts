import {
  Mesh,
  MeshPhysicalMaterial,
  CylinderGeometry,
  Color,
  Texture,
} from 'three';
import { MAX_HEIGHT } from 'consts';

/**
 * Generates the sea layer of the map
 * @param texture texture asset
 * @param environmentMap environmentMap asset
 * @returns ThreeJS mesh that needs to be added to the scene
 */
export function generateSeaMesh(
  texture: Texture,
  environmentMap: Texture
): Mesh<CylinderGeometry, MeshPhysicalMaterial> {
  const seaMesh = new Mesh(
    new CylinderGeometry(17, 17, MAX_HEIGHT * 0.2, 50),
    new MeshPhysicalMaterial({
      envMap: environmentMap,
      color: new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3),
      envMapIntensity: 0.2,
      roughness: 1,
      metalness: 0.025,
      roughnessMap: texture,
      metalnessMap: texture,
      // leverage transmission shader of threejs - used for glass/water
      // if you turn this on you will suffer a huge performance loss
      // ior: 1.4,
      // transmission: 1,
      // transparent: true,
      // thickness: 1.5
    })
  );
  seaMesh.receiveShadow = true;
  seaMesh.position.set(0, MAX_HEIGHT * 0.1, 0);
  return seaMesh;
}

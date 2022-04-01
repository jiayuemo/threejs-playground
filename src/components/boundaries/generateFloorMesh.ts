import {
  Mesh,
  CylinderGeometry,
  MeshPhysicalMaterial,
  DoubleSide,
  Texture
} from 'three';
import { MAX_HEIGHT } from 'consts';

/**
 * Generates the floor under the map
 * @param texture Texture asset
 * @param environmentMap environmentMap Asset
 * @returns ThreeJS mesh that needs to be added to the scene
 */
export function generateFloorMesh(
  texture: Texture,
  environmentMap: Texture
): Mesh<CylinderGeometry, MeshPhysicalMaterial> {
  const mapFloor = new Mesh(
    new CylinderGeometry(18.5, 18.5, MAX_HEIGHT * 0.1, 50),
    new MeshPhysicalMaterial({
      envMap: environmentMap,
      map: texture,
      envMapIntensity: 0.1,
      side: DoubleSide
    })
  );
  mapFloor.receiveShadow = true;
  mapFloor.position.set(0, -MAX_HEIGHT * 0.05, 0);
  return mapFloor;
}

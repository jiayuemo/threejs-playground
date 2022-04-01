import { 
  Mesh,
  CylinderGeometry,
  MeshPhysicalMaterial,
  DoubleSide,
  Texture
} from 'three';
import { MAX_HEIGHT } from '../../consts';

/**
 * Generates the low wall surrounding the map
 * @param texture Texture asset
 * @param environmentMap environmentMap asset
 * @returns ThreeJS mesh that needs to be added to the scene
 */
export function generateContainerMesh(
  texture: Texture, 
  environmentMap: Texture
): Mesh<CylinderGeometry, MeshPhysicalMaterial> {
  const mapContainer = new Mesh(
    new CylinderGeometry(17.1, 17.1, MAX_HEIGHT * 0.25, 50, 1, true),
    new MeshPhysicalMaterial({
      envMap: environmentMap,
      map: texture,
      envMapIntensity: 0.2,
      side: DoubleSide,
    })
  );
  mapContainer.receiveShadow = true;
  mapContainer.position.set(0, MAX_HEIGHT * 0.075, 0);
  return mapContainer;
}

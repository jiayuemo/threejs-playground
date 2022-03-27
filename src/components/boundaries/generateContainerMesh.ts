import { 
  Mesh,
  CylinderGeometry,
  MeshPhysicalMaterial,
  DoubleSide
} from 'three';
import { MAX_HEIGHT } from '../../consts';

export function generateContainerMesh(texture, envMap) {
  const mapContainer = new Mesh(
    new CylinderGeometry(17.1, 17.1, MAX_HEIGHT * 0.25, 50, 1, true),
    new MeshPhysicalMaterial({
      envMap: envMap,
      map: texture,
      envMapIntensity: 0.2,
      side: DoubleSide,
    })
  );
  mapContainer.receiveShadow = true;
  mapContainer.position.set(0, MAX_HEIGHT * 0.075, 0);
  return mapContainer;
}
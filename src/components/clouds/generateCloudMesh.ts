import {
  BufferGeometry,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  Texture
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { MAX_HEIGHT } from '../../consts';

/**
 * Generates the clouds littered throughout the map airspace
 * @param environmentMap environmentMap asset
 * @returns ThreeJS mesh that needs to be added to the scene
 */
export function generateCloudMesh(environmentMap: Texture): Mesh<SphereGeometry, MeshStandardMaterial> {
  let cloudsGeometry = new SphereGeometry(0, 0, 0);
  const cloudCount = Math.floor(Math.pow(Math.random(), 0.45) * 6);

  let cloudGeometry: BufferGeometry;
  let puff1: SphereGeometry;
  let puff2: SphereGeometry;
  let puff3: SphereGeometry;
  for (let i = 0; i < cloudCount; i++) {
    puff1 = new SphereGeometry(1.2, 7, 7);
    puff2 = new SphereGeometry(1.5, 7, 7);
    puff3 = new SphereGeometry(0.9, 7, 7);
    
    // translate(x axis, y axis, z axis)
    puff1.translate(-1.85, Math.random() * 0.3, 0);
    puff2.translate(0, Math.random() * 0.3, 0);
    puff3.translate(1.85, Math.random() * 0.3, 0);

    cloudGeometry = mergeBufferGeometries([puff1, puff2, puff3]) as BufferGeometry;
    cloudGeometry.translate(
      Math.random() * 20 - 10,
      Math.random() * 7 + 7,
      Math.random() * 20 - 10
    );
    cloudGeometry.rotateY(Math.random() * Math.PI * 2);
    cloudsGeometry = mergeBufferGeometries([cloudsGeometry, cloudGeometry]) as SphereGeometry;
  }
  
  const cloudsMesh = new Mesh(
    cloudsGeometry,
    new MeshStandardMaterial({
      envMap: environmentMap,
      envMapIntensity: 0.75,
      flatShading: true
    })
  );
  cloudsMesh.position.set(0, MAX_HEIGHT * 0.55, 0);
  return cloudsMesh;
}

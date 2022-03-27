import { MeshPhysicalMaterial, Mesh } from 'three';
import { generateHexagonGeometries } from './generateHexagonGeometry';
/**
 * Hexagon (Tile) Mesh logic
 */
// make a single mesh containing all hexagon geometries
// to minimize gpu draw calls per frame; performance benefit

function generateHexagonMesh(geometry, texture, enviornmentMap) {
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

export function generateTileMesh(textures, envMap) {
  const hexagonGeometries = generateHexagonGeometries();
  // Each hexagon mesh contains all <property> hexagons, for performance reasons
  const hexagonMeshes = {
    stone: generateHexagonMesh(hexagonGeometries.stone, textures.stone, envMap),
    grass: generateHexagonMesh(hexagonGeometries.grass, textures.grass, envMap),
    dirt: generateHexagonMesh(hexagonGeometries.dirt, textures.dirt, envMap),
    dirt2: generateHexagonMesh(hexagonGeometries.dirt2, textures.dirt2, envMap),
    sand: generateHexagonMesh(hexagonGeometries.sand, textures.sand, envMap),
    snow: generateHexagonMesh(hexagonGeometries.snow, textures.snow, envMap),
  };

  return hexagonMeshes;
}


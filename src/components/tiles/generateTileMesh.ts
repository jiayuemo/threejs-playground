import { MeshPhysicalMaterial, Mesh, Texture, BoxGeometry } from 'three';
import { generateHexagonGeometries } from './generateHexagonGeometry';

/**
 * Top level driver function to generate all tile meshes
 * @param textures texture asset
 * @param environmentMap environmentMap asset
 * @returns object all tile meshes in an object for easy access
 */
 export function generateTileMesh(
  textures: Record<string, Texture>,
  environmentMap: Texture
): Record<string, Mesh<BoxGeometry, MeshPhysicalMaterial>> {
  const hexagonGeometries = generateHexagonGeometries();
  // Each hexagon mesh contains all <property> hexagons, for performance reasons
  const hexagonMeshes = {
    stone: generateHexagonMesh(hexagonGeometries.stone, textures.stone, environmentMap),
    grass: generateHexagonMesh(hexagonGeometries.grass, textures.grass, environmentMap),
    dirt: generateHexagonMesh(hexagonGeometries.dirt, textures.dirt, environmentMap),
    dirt2: generateHexagonMesh(hexagonGeometries.dirt2, textures.dirt2, environmentMap),
    sand: generateHexagonMesh(hexagonGeometries.sand, textures.sand, environmentMap),
    snow: generateHexagonMesh(hexagonGeometries.snow, textures.snow, environmentMap),
  };

  return hexagonMeshes;
}

/**
 * Generate a single mesh to contain all hexagon geometries (Tiles) associated with a texture type.
 * Done to minimize gpu calls per frame as a performance benefit
 * @param geometry geometry of the tiles
 * @param texture texture asset
 * @param environmentMap environmentMap asset
 * @returns ThreeJS mesh that needs to be added to the scene
 */
function generateHexagonMesh(
  geometry: BoxGeometry,
  texture: Texture,
  environmentMap: Texture
): Mesh<BoxGeometry, MeshPhysicalMaterial> {
  const material = new MeshPhysicalMaterial({
    envMap: environmentMap,
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

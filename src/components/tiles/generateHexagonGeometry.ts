import { 
  BoxGeometry,
  CylinderGeometry,
  Vector2
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import SimplexNoise from 'simplex-noise';

import { MAX_HEIGHT, HEIGHT_CONSTANTS } from '../../consts';
import {
  snowmanSpheres,
  stoneSphere,
  treePyramids
} from '../doodles';

export function generateHexagonGeometries() {
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
          hexagonGeometries.snow = mergeBufferGeometries([hexagonGeometries.snow, nextGeo]) as BoxGeometry;
          if (Math.random() > 0.4) {
            hexagonGeometries.snow = mergeBufferGeometries([hexagonGeometries.snow, snowmanSpheres(nextGeoHeight,nextGeoPosition)]) as BoxGeometry;
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.STONE) {
          hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, nextGeo]) as BoxGeometry;
          // spawn stones by merging stone hexagon geometry with stone sphere geometry randomly
          if (Math.random() > 0.8) {
            hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, stoneSphere(nextGeoHeight, nextGeoPosition)]) as BoxGeometry;
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.DIRT) {
          hexagonGeometries.dirt = mergeBufferGeometries([hexagonGeometries.dirt, nextGeo]) as BoxGeometry;
          if (Math.random() > 0.6 && hexagonGeometries.grass) {
            hexagonGeometries.grass = mergeBufferGeometries([hexagonGeometries.grass, treePyramids(nextGeoHeight, nextGeoPosition)]) as BoxGeometry;
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.GRASS) {
          hexagonGeometries.grass = mergeBufferGeometries([hexagonGeometries.grass, nextGeo]) as BoxGeometry;
          if (Math.random() > 0.6) {
            hexagonGeometries.grass = mergeBufferGeometries([hexagonGeometries.grass, treePyramids(nextGeoHeight, nextGeoPosition)]) as BoxGeometry;
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.SAND) {
          hexagonGeometries.sand = mergeBufferGeometries([hexagonGeometries.sand, nextGeo]) as BoxGeometry;
          // create stone spheres on top of sand hexagons,
          // this uses sand hexagon position as a starting off point
          // if you did not render sand hexagons these stone spheres look like they float in space with no hexagon under them
          if (Math.random() > 0.8 && hexagonGeometries.stone) {
            hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, stoneSphere(nextGeoHeight, nextGeoPosition)]) as BoxGeometry;
          }
        } else if (nextGeoHeight > HEIGHT_CONSTANTS.DIRT2) {
          hexagonGeometries.dirt2 = mergeBufferGeometries([hexagonGeometries.dirt2, nextGeo]) as BoxGeometry; 
          if (Math.random() > 0.8 && hexagonGeometries.stone) {
            hexagonGeometries.stone = mergeBufferGeometries([hexagonGeometries.stone, stoneSphere(nextGeoHeight, nextGeoPosition)]) as BoxGeometry;
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

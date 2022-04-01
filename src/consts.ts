/**
 * Define some height constants used for hexagon tiles
 */

/**
 * MAX_HEIGHT represents the tallest a tile can get
 */
const MAX_HEIGHT = 10;

/**
 * HEIGHT_CONSTANTS represents the height ranges in which a texture type is allowed
 */
const HEIGHT_CONSTANTS = {
  SNOW: MAX_HEIGHT * 0.9,
  STONE: MAX_HEIGHT * 0.8,
  DIRT: MAX_HEIGHT * 0.7,
  GRASS: MAX_HEIGHT * 0.5,
  SAND: MAX_HEIGHT * 0.3,  
  DIRT2: MAX_HEIGHT * 0,
};

export {
  MAX_HEIGHT,
  HEIGHT_CONSTANTS
}

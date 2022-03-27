import { SphereGeometry } from "three";

/**
 * Tile logic is very tightly coupled with scene prop (doodles) logic -
 * thats to reuse position information instead of passing it everywhere
 */
// Will be Closely associated with stone hexagon geometry (texture)
export function stoneSphere(height, position) {
  // random small offsets for rock displacement
  const px = Math.random() * 0.4;
  const py = Math.random() * 0.4;

  // create a radius between 0.1 and 0.4
  const geo = new SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geo.translate(position.x + px, height, position.y + py);

  return geo;
}

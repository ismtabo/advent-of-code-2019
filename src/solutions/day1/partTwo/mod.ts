import { fuel, partOne } from "../partOne/mod.ts";

export function recursiveFuel(mass: number): number {
  const consumption = fuel(mass);
  return consumption > 0 ? consumption + recursiveFuel(consumption) : 0;
}

export function partTwo(input: number[]) {
  return partOne(input, recursiveFuel);
}

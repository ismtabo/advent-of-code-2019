import { sumSync } from "https://deno.land/x/sum/mod.ts";

export function fuel(n: number): number {
  return Math.floor(n / 3) - 2;
}

export function partOne(input: number[], fuelFn = fuel) {
  return sumSync(input.map(fuelFn));
}

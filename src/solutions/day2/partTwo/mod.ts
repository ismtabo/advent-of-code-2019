import { partOne } from "../partOne/mod.ts";

export function partTwo(input: number[]) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      try {
        const result = partOne(input, noun, verb);
        if (result === 19690720) {
          return 100 * noun + verb;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return NaN;
}

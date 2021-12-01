import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { recursiveFuel } from "./mod.ts";

Deno.test("recursiveFuel should return recursive mass consumption", () => {
  assertEquals(recursiveFuel(14), 2);
  assertEquals(recursiveFuel(1969), 966);
  assertEquals(recursiveFuel(100756), 50346);
});

import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { fuel } from "./mod.ts";

// Simple name and function, compact form, but not configurable
Deno.test("fuel should return mass consumption", () => {
  assertEquals(fuel(12), 2);
  assertEquals(fuel(14), 2);
  assertEquals(fuel(1969), 654);
  assertEquals(fuel(100756), 33583);
});

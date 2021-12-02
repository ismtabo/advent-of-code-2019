import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { command, dispatch, firstParam, nextIP, params } from "./mod.ts";

Deno.test("firstParam should return first IP param index", () => {
  assertEquals(firstParam(0, [1, 0, 0, 0, 99]), 1);
  assertEquals(firstParam(4, [1, 0, 0, 0, 99]), 0);
});

Deno.test("nextIP should return next IP", () => {
  assertEquals(nextIP(0, [1, 0, 0, 0, 99]), 4);
  assertEquals(nextIP(4, [1, 0, 0, 0, 2, 0, 0, 0]), 0);
});

Deno.test("params should return IP params array", () => {
  assertEquals(params(0, [1, 2, 3, 4, 99]), [2, 3, 4]);
  assertEquals(params(4, [2, 3, 4, 99, 1]), [2, 3, 4]);
});

Deno.test("dispatch should return next state", () => {
  assertEquals(
    dispatch([1, 2, 3, 4, 99], { type: "sum", payload: [2, 3, 4] }),
    [1, 2, 3, 4, 7],
  );
  assertEquals(
    dispatch([2, 2, 3, 4, 99], { type: "mul", payload: [2, 3, 4] }),
    [2, 2, 3, 4, 12],
  );
});

Deno.test("command should execute correctly the result", async (t) => {
  await t.step({
    name: "(1 + 1 = 2)",
    fn: () => {
      const program = [1, 0, 0, 0, 99];
      const expectedResult = [2, 0, 0, 0, 99];
      assertEquals(command(program), expectedResult);
    },
  });
  await t.step({
    name: "(3 * 2 = 6)",
    fn: () => {
      const program = [2, 3, 0, 3, 99];
      const expectedResult = [2, 3, 0, 6, 99];
      assertEquals(command(program), expectedResult);
    },
  });
  await t.step({
    name: "(99 * 99 = 9801)",
    fn: () => {
      const program = [2, 4, 4, 5, 99, 0];
      const expectedResult = [2, 4, 4, 5, 99, 9801];
      assertEquals(command(program), expectedResult);
    },
  });
  await t.step({
    name: "loop",
    fn: () => {
      const program = [1, 1, 1, 4, 99, 5, 6, 0, 99];
      const expectedResult = [30, 1, 1, 4, 2, 5, 6, 0, 99];
      assertEquals(command(program), expectedResult);
    },
  });
});

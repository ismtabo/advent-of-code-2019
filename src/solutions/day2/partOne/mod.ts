export const PARAMS_LENGTH = 3;

/**
 * @param ip Instruction pointer
 * @param program array of instructions
 * @returns the first param index of given IP in program
 */
export const firstParam = (ip: number, program: number[]) =>
  (ip + 1) % program.length;

/**
 * @param ip Instruction pointer
 * @param program array of instructions
 * @returns next command index in program for IP
 */
export const nextIP = (ip: number, program: number[]) =>
  (firstParam(ip, program) + PARAMS_LENGTH) % program.length;

/**
 * @param ip Instruction pointer
 * @param program instructions
 * @returns the array of params in program for IP
 */
export function params(ip: number, program: number[]) {
  if (firstParam(ip, program) + PARAMS_LENGTH > program.length) {
    return [
      ...program.slice(firstParam(ip, program)),
      ...program.slice(
        0,
        firstParam(ip, program) + PARAMS_LENGTH - program.length,
      ),
    ];
  }
  return program.slice(
    firstParam(ip, program),
    firstParam(ip, program) + PARAMS_LENGTH,
  );
}

/**
 * @params state
 * @params action
 * @returns new state after dispatching the action
 */
export function dispatch(
  state: number[],
  action: { type: "sum" | "mul"; payload: number[] },
) {
  switch (action.type) {
    case "sum": {
      const [a, b, dest] = action.payload;
      const sum = state[a] + state[b];
      return [...state.slice(0, dest), sum, ...state.slice(dest + 1)];
    }
    case "mul": {
      const [a, b, dest] = action.payload;
      const mul = state[a] * state[b];
      return [...state.slice(0, dest), mul, ...state.slice(dest + 1)];
    }
    default:
      return state;
  }
}

/**
 * @params program
 * @params ip Instruction pointer
 * @returns final state after program execution
 * @throws exception if current IP opcode is unknown or
 *  if an infinite loop has been detected
 */
export function command(
  program: number[],
  ip = 0,
  visitedIPs = new Set<number>(),
): number[] {
  if (visitedIPs.has(ip)) {
    throw new Error("infinite loop detected");
  }
  let opcode;
  switch (opcode = program.at(ip % program.length)) {
    case 1:
      return command(
        dispatch(program, { type: "sum", payload: params(ip, program) }),
        nextIP(ip, program),
        visitedIPs.add(ip),
      );
    case 2:
      return command(
        dispatch(program, { type: "mul", payload: params(ip, program) }),
        nextIP(ip, program),
        visitedIPs.add(ip),
      );
    case 99:
      return program;
    default:
      throw new Error(`unknown command ${opcode}`);
  }
}

export function partOne(input: number[], noun = 12, verb = 2) {
  input.splice(1, 1, noun);
  input.splice(2, 1, verb);
  const result = command(input, 0);
  return result.at(0);
}

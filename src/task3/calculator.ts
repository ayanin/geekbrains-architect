import { isOperator, OPERATORS } from "./helpers";

export function calculate(input: string): number {
  const stack: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const lexem = input[i];

    if (isOperator(lexem)) {
      const lastNumber = stack.pop();
      const penultimateNumber = stack.pop();
      let result: number | null = null;

      result = OPERATORS[lexem](penultimateNumber, lastNumber);

      stack.push(result);
    } else {
      stack.push(+lexem);
    }
  }

  return stack.pop();
}

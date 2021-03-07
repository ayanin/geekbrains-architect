import { isOperator, OPERATORS } from "../utils";

export class Calculator {
  private stack: number[] = [];
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  calculate(): number {
    for (let i = 0; i < this.input.length; i++) {
      const lexem = this.input[i];

      if (isOperator(lexem)) {
        const lastNumber = this.stack.pop();
        const penultimateNumber = this.stack.pop();
        let result: number | null = null;

        result = OPERATORS[lexem](penultimateNumber, lastNumber);

        this.stack.push(result);
      } else {
        this.stack.push(+lexem);
      }
    }

    return this.stack.pop();
  }

  printResult() {
    console.log(this.calculate());
  }
}

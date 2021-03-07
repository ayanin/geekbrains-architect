import {
  isNumber,
  isFunction,
  isOpenBracket,
  isSeparator,
  getPriority,
  isCloseBracket,
  isBracket,
  isOperator,
  isLeftAssoc,
} from "./../utils";

export class SortStation {
  private input: string;
  private stack: string[] = [];
  private output: string = "";

  constructor(input: string) {
    this.input = input;
  }

  sort(): string {
    for (let i = 0; i < this.input.length; i++) {
      const lexem = this.input[i];

      if (isNumber(lexem)) {
        this.output += lexem;
      } else if (isFunction(lexem) || isOpenBracket(lexem)) {
        this.stack.push(lexem);
      } else if (isSeparator(lexem)) {
        let topOfStack = this.stack[this.stack.length - 1] ?? null;

        while (!isOpenBracket(topOfStack)) {
          this.output += this.stack.pop();
          topOfStack = this.stack[this.stack.length - 1] ?? null;
        }

        if (!this.stack.length) {
          throw new Error(`An expression mustn't be empty`);
        }
      } else if (isOperator(lexem)) {
        let op1 = lexem;
        let op2 = this.stack[this.stack.length - 1] ?? null;

        while (
          isOperator(op2) &&
          getPriority(op2) >= getPriority(op1) &&
          isLeftAssoc(op1)
        ) {
          this.output += this.stack.pop();
          op2 = this.stack[this.stack.length - 1] ?? null;
        }

        this.stack.push(op1);
      } else if (isOpenBracket(lexem)) {
        this.stack.push(lexem);
      } else if (isCloseBracket(lexem)) {
        let topOfStack = this.stack[this.stack.length - 1] ?? null;

        while (!isOpenBracket(topOfStack)) {
          this.output += this.stack.pop();
          topOfStack = this.stack[this.stack.length - 1] ?? null;
        }

        if (this.stack.length === 0) {
          throw new Error("An open bracket was expected, but stack is empty");
        }

        if (isOpenBracket(topOfStack)) {
          this.stack.pop();
        }
      }
    }

    let topOfStack = null;
    while ((topOfStack = this.stack.pop())) {
      if (isBracket(topOfStack)) {
        throw new Error(
          `An expression mustn't contain any brackets in the end`
        );
      }

      this.output += topOfStack;
    }

    return this.output.trim();
  }
}

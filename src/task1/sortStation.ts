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
} from "./helpers";

export function sortStation(input: string): string {
  let output = "";
  const stack = [];

  for (let i = 0; i < input.length; i++) {
    const lexem = input[i];

    if (isNumber(lexem)) {
      output += lexem;
    } else if (isFunction(lexem) || isOpenBracket(lexem)) {
      stack.push(lexem);
    } else if (isSeparator(lexem)) {
      let topOfStack = stack[stack.length - 1] ?? null;

      while (!isOpenBracket(topOfStack)) {
        output += stack.pop();
        topOfStack = stack[stack.length - 1] ?? null;
      }

      if (!stack.length) {
        throw new Error(`An expression mustn't be empty`);
      }
    } else if (isOperator(lexem)) {
      let op1 = lexem;
      let op2 = stack[stack.length - 1] ?? null;

      while (
        isOperator(op2) &&
        getPriority(op2) >= getPriority(op1) &&
        isLeftAssoc(op1)
      ) {
        output += stack.pop();
        op2 = stack[stack.length - 1] ?? null;
      }

      stack.push(op1);
    } else if (isOpenBracket(lexem)) {
      stack.push(lexem);
    } else if (isCloseBracket(lexem)) {
      let topOfStack = stack[stack.length - 1] ?? null;

      while (!isOpenBracket(topOfStack)) {
        output += stack.pop();
        topOfStack = stack[stack.length - 1] ?? null;
      }

      if (stack.length === 0) {
        throw new Error("An open bracket was expected, but stack is empty");
      }

      if (isOpenBracket(topOfStack)) {
        stack.pop();
      }
    }
  }

  let topOfStack = null;
  while ((topOfStack = stack.pop())) {
    if (isBracket(topOfStack)) {
      throw new Error(`An expression mustn't contain any brackets in the end`);
    }

    output += topOfStack;
  }

  return output.trim();
}

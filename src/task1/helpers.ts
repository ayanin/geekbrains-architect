export const SEPORATOR_LEXEMES = [","];

export const OPERATORS: {
  [operator: string]: (a: number, b: number) => number;
} = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

export function isNumber(lexem: string): boolean {
  const num = parseInt(lexem, 10);

  return !isNaN(num);
}

export function isOperator(lexem: string): boolean {
  return lexem in OPERATORS;
}

export function isSeparator(lexem: string): boolean {
  return SEPORATOR_LEXEMES.includes(lexem);
}

export function getPriority(lexem: string): number {
  switch (lexem) {
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
    default:
      return 0;
  }
}

export function isLeftAssoc(lexem: string): boolean {
  switch (lexem) {
    case "*":
    case "/":
    case "+":
    case "-":
      return true;
    default:
      return false;
  }
}

export function isOpenBracket(lexem: string): boolean {
  return lexem === "(";
}

export function isCloseBracket(lexem: string): boolean {
  return lexem === ")";
}

export function isBracket(lexem: string): boolean {
  return isOpenBracket(lexem) || isCloseBracket(lexem);
}

export function isFunction(lexem: string): boolean {
  return lexem >= "A" && lexem <= "Z";
}

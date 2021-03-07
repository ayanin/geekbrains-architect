import { createInterface } from "readline";

import { ReaderExpression } from "./ReaderExpression";

export class ConsoleReaderExpressionImpl implements ReaderExpression {
  read(): Promise<string> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      readline.question("Input expression:\n", (exp) => {
        readline.close();
        resolve(exp);
      });
    });
  }
}

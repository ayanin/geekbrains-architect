import { createInterface } from "readline";
import { sortStation } from "./sortStation";
import { calculate } from "./calculator";
import { Monad } from "./Monad";

main();

async function main() {
  const exp = await readExpression();
  Monad.apply(() => exp)
    .map(sortStation)
    .map(calculate)
    .mapToNull(console.log)
    .unsafeRun();
}

function readExpression() {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question("Input expression:\n", (exp) => {
      readline.close();
      resolve(exp);
    });
  });
}

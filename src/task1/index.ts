import { createInterface } from "readline";
import { sortStation } from "./sortStation";
import { calculate } from "./calculator";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Input expression:\n", (exp) => {
  const polishNotation = sortStation(exp);
  console.log(polishNotation);
  const result = calculate(polishNotation);
  console.log(result);
  readline.close();
});

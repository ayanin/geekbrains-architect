import { Calculator } from "./Calculator";
import { ConsoleReaderExpressionImpl, Reader } from "./Reader";
import { SortStation } from "./SortStation";

class Main {
  static async main() {
    const consoleReader = new ConsoleReaderExpressionImpl();
    const reader = new Reader(consoleReader);
    const expression = await reader.read();
    const sortStation = new SortStation(expression);
    const polishNotation = sortStation.sort();
    const calculator = new Calculator(polishNotation);
    calculator.printResult();
  }
}

Main.main();

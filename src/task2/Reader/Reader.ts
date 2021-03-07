import { ReaderExpression } from "./ReaderExpression";

export class Reader {
  private readerInstance: ReaderExpression;

  constructor(readerInstance: ReaderExpression) {
    this.readerInstance = readerInstance;
  }

  read(): Promise<string> {
    return this.readerInstance.read();
  }
}

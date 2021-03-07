export interface ReaderExpression {
  read(): Promise<string>;
}

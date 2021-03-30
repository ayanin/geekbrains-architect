export interface Effect<T> {
  run(): T;
}

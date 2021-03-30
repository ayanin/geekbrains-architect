export class Monad {
  private value;

  constructor(value) {
    this.value = value;
    this.run = this.run.bind(this);
    this.map = this.map.bind(this);
    this.flatMap = this.flatMap.bind(this);
    this.mapToNull = this.mapToNull.bind(this);
  }

  run() {
    return this.value();
  }

  flatMap(func) {
    return Monad.apply(() => {
      const v = this.run();
      return func.call(this, v).run();
    });
  }

  map(func) {
    return this.flatMap((result) => Monad.apply(() => func.call(this, result)));
  }

  mapToNull(func) {
    // (v) => console.log(v)
    return this.flatMap((result) => {
      return Monad.apply(() => {
        func.call(this, result);
        return null;
      });
    });
  }

  static apply(value) {
    return new Monad(value);
  }
}

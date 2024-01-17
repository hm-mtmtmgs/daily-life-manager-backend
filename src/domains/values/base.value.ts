export abstract class Base<T> {
  // 同様の型構造のクラスを区別するためにnameプロパティを追加
  private _name = this.constructor.name;
  constructor(protected readonly _value: T) {
    this._validate(this._value);
  }
  protected abstract _validate(value: T): void;
  get value(): T {
    return this._value;
  }
  get name(): string {
    return this._name;
  }

  equals(other: Base<T>): boolean {
    return this.value === other.value;
  }
}

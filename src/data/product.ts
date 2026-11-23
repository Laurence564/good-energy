export class Product {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: string
  ) {
    Object.freeze(this);
  }
}
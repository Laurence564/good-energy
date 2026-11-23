export class Customer {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly postalCode: string
  ) {
    Object.freeze(this);
  }
}

export const Customers = {
  standard: new Customer("Joe", "Blogs", "XXXX XXX"),
} as const;
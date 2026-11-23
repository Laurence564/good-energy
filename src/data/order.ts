import {Customer, Customers} from './customer';
import {Product, Products} from './product';

/**
 * The seeded expectation for one complete order: who it ships to, what is in
 * it, and what it should cost. The totals live here rather than on Product
 * because they are a property of the basket, not of any one item.
 */
export class Order {
  constructor(
    public readonly customer: Customer,
    public readonly products: readonly Product[],
    public readonly itemTotal: string,
    public readonly tax: string,
    public readonly total: string
  ) {
    Object.freeze(this.products);
    Object.freeze(this);
  }
}

export const Orders = {
  singleBikeLight: new Order(
    Customers.standard,
    [Products.bikeLight],
    "$9.99",
    "$0.80",
    "$10.79"
  ),
} as const;
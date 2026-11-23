export class Product {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: string
  ) {
    Object.freeze(this);
  }
}

export const Products = {
  backpack: new Product(
    "Sauce Labs Backpack",
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    "$29.99"
  ),

  bikeLight: new Product(
    "Sauce Labs Bike Light",
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    "$9.99"
  ),

  boltTShirt: new Product(
    "Sauce Labs Bolt T-Shirt",
    "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    "$15.99"
  ),
} as const;
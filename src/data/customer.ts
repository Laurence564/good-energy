export class Customer {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly postalCode: string
    ) {
        Object.freeze(this);
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

export const Customers = {
    standard: new Customer("Joe", "Blogs", "XXXX XXX"),
} as const;
import {Locator, Page} from "@playwright/test";

export class InventoryItem {
    private readonly item: Locator;

    constructor(private readonly page: Page, productName: string) {
        this.item = this.page.locator('.inventory_item').filter({
            has: this.page.getByText(productName, {exact: true}),
        });
    }

    get productName(): Locator {
        return this.item.locator('.inventory_item_name');
    }

    get productDescription(): Locator {
        return this.item.locator('.inventory_item_desc');
    }

    get productPrice(): Locator {
        return this.item.locator('.inventory_item_price');
    }

    get addToCartButton(): Locator {
        return this.item.getByRole('button', {
            name: 'Add to cart',
        });
    }

    get removeButton(): Locator {
        return this.item.getByRole('button', {
            name: 'Remove',
        });
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
    }
}

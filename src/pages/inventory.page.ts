import {type Locator, type Page} from '@playwright/test';
import {InventoryItem} from "./product.card";
import {CartPage} from "./cart.page";

export class InventoryPage {
    private readonly page: Page;

    readonly title: Locator;
    readonly basketCount: Locator;
    private basketLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.basketCount = page.getByTestId('shopping-cart-badge');
        this.basketLink = page.getByTestId('shopping-cart-link');
    }

    getInventoryItemByName(productName: string): InventoryItem {
        return new InventoryItem(this.page, productName);
    }

    async openBasket(): Promise<CartPage> {
        await this.basketLink.click();
        return new CartPage(this.page);
    }
}
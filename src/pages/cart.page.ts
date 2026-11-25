import {type Locator, type Page} from '@playwright/test';
import {InventoryItem} from './product.card';
import {CheckoutInformationPage} from './checkout-information.page';

export class CartPage {
    private readonly page: Page;

    readonly title: Locator;
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.cartList = page.getByTestId('cart-list');
        this.cartItems = this.cartList.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
    }

    getCartItemByName(productName: string): InventoryItem {
        return new InventoryItem(this.page, productName);
    }

    async checkout(): Promise<CheckoutInformationPage> {
        await this.checkoutButton.click();
        return new CheckoutInformationPage(this.page);
    }
}
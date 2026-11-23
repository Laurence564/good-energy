import {type Locator, type Page} from '@playwright/test';
import {InventoryItem} from './product.card';

export class CheckoutOverviewPage {
    private readonly page: Page;

    readonly title: Locator;
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly paymentInformation: Locator;
    readonly shippingInformation: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.cartList = page.getByTestId('cart-list');
        this.cartItems = this.cartList.getByTestId('inventory-item');
        this.paymentInformation = page.getByTestId('payment-info-value');
        this.shippingInformation = page.getByTestId('shipping-info-value');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.cancelButton = page.getByTestId('cancel');
    }

    getCheckoutItemByName(productName: string): InventoryItem {
        return new InventoryItem(this.page, productName);
    }
}
import {type Locator, type Page} from '@playwright/test';

export class CheckoutCompletePage {
    readonly title: Locator;
    readonly basketCount: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.basketCount = page.getByTestId('shopping-cart-badge');
        this.completeHeader = page.getByTestId('complete-header');
        this.completeText = page.getByTestId('complete-text');
        this.backHomeButton = page.getByTestId('back-to-products');
    }

}
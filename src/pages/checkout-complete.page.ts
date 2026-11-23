import {Download, type Locator, type Page} from '@playwright/test';

export class CheckoutCompletePage {
    readonly title: Locator;
    readonly basketCount: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;
    private generatePdfButton: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.basketCount = page.getByTestId('shopping-cart-badge');
        this.completeHeader = page.getByTestId('complete-header');
        this.completeText = page.getByTestId('complete-text');
        this.backHomeButton = page.getByTestId('back-to-products');
        this.generatePdfButton = page.getByRole('button', {name: 'Generate PDF order'});
    }

    async downloadReceipt(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.generatePdfButton.click();
        return await downloadPromise;
    }
}
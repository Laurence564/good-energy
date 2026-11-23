import {type Locator, type Page} from '@playwright/test';
import {CheckoutOverviewPage} from './checkout-overview.page';

export class CheckoutInformationPage {
    private readonly page: Page;

    readonly title: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.cancelButton = page.getByTestId('cancel');
        this.errorMessage = page.getByTestId('error');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastName.fill(lastName);
    }

    async enterPostalCode(postalCode: string): Promise<void> {
        await this.postalCode.fill(postalCode);
    }

    async submit(): Promise<void> {
        await this.continueButton.click();
    }

    async submitExpectingSuccess(): Promise<CheckoutOverviewPage> {
        await this.submit();
        return new CheckoutOverviewPage(this.page);
    }
}
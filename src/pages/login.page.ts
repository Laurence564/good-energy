import {type Locator, type Page} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    readonly errorMessage: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = page.getByTestId('error');
        this.loginButton = page.getByTestId('login-button');
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async submit(): Promise<void> {
        await this.loginButton.click();
    }
}
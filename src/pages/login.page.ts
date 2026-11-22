import {expect, type Locator, type Page, test} from '@playwright/test';

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

    async expectingError(expected: string): Promise<void> {
        await test.step(`Expect login rejected with: "${expected}"`, async () => {
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toHaveText(expected);
            await expect(this.page).toHaveURL('/');
        });
    }
}
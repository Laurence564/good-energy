import {expect, type Locator, type Page, test} from '@playwright/test';
import {InventoryPage} from "./inventory.page";

export class LoginPage {
    private readonly page: Page;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly errorMessage: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.errorMessage = page.getByTestId('error');
        this.loginButton = page.getByTestId('login-button');
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async submit(): Promise<void> {
        await this.loginButton.click();
    }

    async submitExpectingSuccess(): Promise<InventoryPage> {
        return await test.step('Expect login to be accepted', async () => {
            await this.loginButton.click();
            await expect(this.page).toHaveURL('/inventory.html');
            return new InventoryPage(this.page);
        });
    }

    async expectingError(expected: string): Promise<void> {
        await test.step(`Expect login rejected with: "${expected}"`, async () => {
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toHaveText(expected);
            await expect(this.page).toHaveURL('/');
        });
    }
}
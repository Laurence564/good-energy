import {expect, type Locator, type Page, test} from '@playwright/test';
import {InventoryPage} from "./inventory.page";

export class LoginPage {
    private readonly page: Page;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    readonly errorMessage: Locator;

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

    async submitExpectingError(): Promise<void> {
        await this.loginButton.click();
    }

    async submitExpectingSuccess(): Promise<InventoryPage> {
        await this.loginButton.click();
        return new InventoryPage(this.page);
    }
}
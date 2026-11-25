import {expect, test} from '@playwright/test';
import {LoginPage} from '../../src/pages/login.page';
import {LoginErrors} from '../../src/data/login-errors';
import {Users} from '../../src/data/users.ts';

test.describe('Login — negative paths', () => {

    /**
     * SC1 - Empty username: TRUE | Empty password: TRUE
     */
    test('SC1: submitting an empty login form reports the username as required',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.USERNAME_REQUIRED);
            await expect(page).toHaveURL('/');
        });

    /**
     * SC2 - Empty username: TRUE | Empty password: FALSE
     */
    test('SC2: submitting a password with no username reports the username as required',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterPassword(Users.STANDARD.password);
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.USERNAME_REQUIRED);
            await expect(page).toHaveURL('/');
        });

    /**
     * SC3 - Empty username: FALSE | Empty password: TRUE
     */
    test('SC3: submitting a username with no password reports the password as required',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterUsername(Users.STANDARD.username);
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.PASSWORD_REQUIRED);
            await expect(page).toHaveURL('/');
        });

    /**
     * SC4 - Known username: TRUE | Known password: FALSE
     */
    test('SC4: a known username with an incorrect password is rejected as a credentials mismatch',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterUsername(Users.STANDARD.username);
            await loginPage.enterPassword(Users.UNKNOWN.password);
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.CREDENTIALS_MISMATCH);
            await expect(page).toHaveURL('/');
        });

    /**
     * SC5 - Known username: FALSE | Known password: TRUE
     */
    test('SC5: an unknown username with a valid password is rejected as a credentials mismatch',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterUsername(Users.UNKNOWN.username);
            await loginPage.enterPassword(Users.STANDARD.password);
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.CREDENTIALS_MISMATCH);
            await expect(page).toHaveURL('/');
        });

    /**
     * SC6 - Known username: FALSE | Known password: FALSE
     */
    test('SC6: an unknown username and password is rejected as a credentials mismatch',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterUsername(Users.UNKNOWN.username);
            await loginPage.enterPassword(Users.UNKNOWN.password);
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.CREDENTIALS_MISMATCH);
            await expect(page).toHaveURL('/');
        });

    /**
     * SC7 - Known username: TRUE | Known password: TRUE | Account locked: TRUE
     */
    test('SC7: a locked out user with valid credentials is refused access',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterUsername(Users.LOCKED_OUT.username);
            await loginPage.enterPassword(Users.LOCKED_OUT.password);
            await loginPage.submitExpectingError();

            // Assert
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(LoginErrors.LOCKED_OUT);
            await expect(page).toHaveURL('/');
        });
});
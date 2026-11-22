import {test, expect} from '@playwright/test';
import {LoginPage} from '../../src/pages/login.page';

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
            await loginPage.submit();

            // Assert — which rule fired
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');

            // Assert — user remains on login page
            await expect(page).toHaveURL('/');
            await expect(loginPage.loginButton).toBeVisible();
        });
});
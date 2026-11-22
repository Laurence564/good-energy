import {test } from '@playwright/test';
import {LoginPage} from '../../src/pages/login.page';
import {LoginErrors} from "../../src/data/login-errors";

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

            // Assert
            await loginPage.expectingError(LoginErrors.USERNAME_REQUIRED);
        });
});
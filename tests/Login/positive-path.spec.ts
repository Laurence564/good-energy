import {expect, test} from '@playwright/test';
import {LoginPage} from '../../src/pages/login.page';
import {Users} from '../../src/data/users';

test.describe('Login — positive path', () => {

    /**
     * SC8 - Known username: TRUE | Known password: TRUE | Account locked: FALSE
     */
    test('SC8: valid credentials for an active account grant access to the products page',
        async ({ page }) => {

            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.enterUsername(Users.STANDARD.username);
            await loginPage.enterPassword(Users.STANDARD.password);
            const inventoryPage = await loginPage.submitExpectingSuccess();

            // Assert
            await expect(inventoryPage.title).toHaveText('Products');
        });
});
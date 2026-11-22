import {test, expect} from '@playwright/test';

//test.describe('Login - negative paths', () => {
    /**
     * SC1 - Empty username: TRUE | Empty password: TRUE
     * Expected: "Epic sadface: Username is required"
     */
    test('SC1: submitting an empty login form reports the username as required',
        async ({ page }) => {
            // Arrange
            await page.goto('/');

            // Act
            await page.getByTestId('login-button').click();

            // Assert
            const error = page.getByTestId('error');
            await expect(error).toBeVisible();
            await expect(error).toHaveText('Epic sadface: Username is required');

            // Assert — and that we were not let in. "FAIL" in the matrix means both.
            await expect(page).toHaveURL('/');
            await expect(page.getByTestId('login-button')).toBeVisible();
        });
//});
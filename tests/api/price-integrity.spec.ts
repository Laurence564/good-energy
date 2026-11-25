import {expect, test} from '@playwright/test';
import {API_BASE_URL, tokenFor} from "./api.helpers";
import {Products} from '../../src/data/product';

const PRODUCT_NAME = Products.bikeLight.name;

/**
 * ASSUMPTIONS — Swag Labs has no backend, so the following are fake test scenarios:
 *   POST /auth/login
 *   POST /orders
 */

test.describe('Orders API — quantities cant be tampered with to trick price changes', () => {

    test('an order for -1 of a product is refused', async ({request}) => {
        // Arrange
        const token = await tokenFor(request, 'standard_user');

        // Act
        const response = await request.post(`${API_BASE_URL}/orders`, {
            headers: {Authorization: `Bearer ${token}`},
            data: {lines: [{productName: PRODUCT_NAME, quantity: -1}]},
        });

        // Assert
        expect(response.status()).toBe(400);
        expect(await response.text()).toContain('quantity');
    });

    test('an order for 0 of a product is refused', async ({request}) => {
        // Arrange
        const token = await tokenFor(request, 'standard_user');

        // Act
        const response = await request.post(`${API_BASE_URL}/orders`, {
            headers: {Authorization: `Bearer ${token}`},
            data: {lines: [{productName: PRODUCT_NAME, quantity: 0}]},
        });

        // Assert
        expect(response.status()).toBe(400);
        expect(await response.text()).toContain('quantity');
    });

    test('an order for 1.5 of a product is refused', async ({request}) => {
        // Arrange
        const token = await tokenFor(request, 'standard_user');

        // Act
        const response = await request.post(`${API_BASE_URL}/orders`, {
            headers: {Authorization: `Bearer ${token}`},
            data: {lines: [{productName: PRODUCT_NAME, quantity: 1.5}]},
        });

        // Assert
        expect(response.status()).toBe(400);
        expect(await response.text()).toContain('quantity');
    });
});
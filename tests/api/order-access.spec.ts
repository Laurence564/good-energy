import {expect, test} from '@playwright/test';
import {API_BASE_URL, placeOrder, tokenFor} from "./api.helpers";

/**
 * ASSUMPTIONS — Swag Labs has no backend, so the following are fake test scenarios:
 *   POST /auth/login
 *   POST /orders
 *   GET  /orders/{id}
 */

test.describe('Orders API — a customer can only read their own order', () => {

    test('the customer who placed the order can read it back', async ({request}) => {
        // Arrange
        const token = await tokenFor(request, 'standard_user');
        const orderId = await placeOrder(request, token);

        // Act
        const response = await request.get(`${API_BASE_URL}/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        // Assert
        expect(response.status()).toBe(200);
        expect((await response.json()).id).toBe(orderId);
    });

    test('a different customer is refused', async ({request}) => {
        // Arrange
        const ownersToken = await tokenFor(request, 'standard_user');
        const orderId = await placeOrder(request, ownersToken);
        const otherToken = await tokenFor(request, 'problem_user');

        // Act
        const response = await request.get(`${API_BASE_URL}/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${otherToken}`},
        });

        // Assert
        expect(response.status()).toBe(404);
    });

    test('a caller with no token is refused', async ({request}) => {
        // Arrange
        const token = await tokenFor(request, 'standard_user');
        const orderId = await placeOrder(request, token);

        // Act
        const response = await request.get(`${API_BASE_URL}/orders/${orderId}`);

        // Assert
        expect(response.status()).toBe(401);
    });
});
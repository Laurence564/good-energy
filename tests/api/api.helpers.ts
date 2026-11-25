import {expect, type APIRequestContext} from '@playwright/test';
import {Products} from '../../src/data/product';

export const API_BASE_URL = 'https://api.saucedemo.test/v1';

const PASSWORD = 'secret_sauce';

export async function tokenFor(request: APIRequestContext, username: string): Promise<string> {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
        data: {username, password: PASSWORD},
    });

    expect(response.status(), `signing in as ${username}`).toBe(200);

    return (await response.json()).token;
}

/**
 * Illustrate how to get an order id
 * @param request
 * @param token
 */
export async function placeOrder(request: APIRequestContext, token: string): Promise<string> {
    const response = await request.post(`${API_BASE_URL}/orders`, {
        headers: {Authorization: `Bearer ${token}`},
        data: {lines: [{productName: Products.bikeLight.name, quantity: 1}]},
    });

    expect(response.status(), 'placing an order to read back').toBe(201);

    return (await response.json()).id;
}
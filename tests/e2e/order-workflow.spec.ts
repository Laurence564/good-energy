import {expect, test} from '@playwright/test';
import {LoginPage} from '../../src/pages/login.page';
import {Users} from '../../src/data/users';
import {Products} from "../../src/data/product";
import {Orders} from "../../src/data/order";

test.describe('Product order e2e', () => {
    test('Order a single product',
        async ({page}) => {

            const order = Orders.singleBikeLight;

            const loginPage = new LoginPage(page);
            await loginPage.goto();

            await loginPage.enterUsername(Users.STANDARD.username);
            await loginPage.enterPassword(Users.STANDARD.password);

            const inventoryPage = await loginPage.submitExpectingSuccess();
            await expect(inventoryPage.title).toHaveText('Products');

            const inventoryItem = inventoryPage.getInventoryItemByName(Products.bikeLight.name);

            await expect(inventoryItem.productDescription).toHaveText(Products.bikeLight.description);
            await expect(inventoryItem.productName).toHaveText(Products.bikeLight.name);
            await expect(inventoryItem.productPrice).toHaveText(Products.bikeLight.price);

            await inventoryItem.addToCart();
            await expect(inventoryPage.basketCount).toHaveText("1");

            const cartPage = await inventoryPage.openBasket();

            await expect(cartPage.title).toBeVisible();
            await expect(cartPage.title).toHaveText('Your Cart');

            await expect(cartPage.cartItems).toHaveCount(1);

            const cartItem = cartPage.getCartItemByName(Products.bikeLight.name);

            await expect(cartItem.productName).toHaveText(Products.bikeLight.name);
            await expect(cartItem.productDescription).toHaveText(Products.bikeLight.description);
            await expect(cartItem.productPrice).toHaveText(Products.bikeLight.price);

            const checkoutInformationPage = await cartPage.checkout();

            await expect(checkoutInformationPage.title).toBeVisible();
            await expect(checkoutInformationPage.title).toHaveText('Checkout: Your Information');

            await checkoutInformationPage.enterFirstName(order.customer.firstName);
            await checkoutInformationPage.enterLastName(order.customer.lastName);
            await checkoutInformationPage.enterPostalCode(order.customer.postalCode);

            const checkoutOverviewPage = await checkoutInformationPage.submitExpectingSuccess();

            await expect(checkoutOverviewPage.title).toBeVisible();
            await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');

            await expect(checkoutOverviewPage.cartItems).toHaveCount(order.products.length);

            const overviewItem = checkoutOverviewPage.getCheckoutItemByName(Products.bikeLight.name);

            await expect(overviewItem.productName).toHaveText(Products.bikeLight.name);
            await expect(overviewItem.productDescription).toHaveText(Products.bikeLight.description);
            await expect(overviewItem.productPrice).toHaveText(Products.bikeLight.price);

            await expect(checkoutOverviewPage.subtotalLabel).toContainText(order.itemTotal);
            await expect(checkoutOverviewPage.taxLabel).toContainText(order.tax);
            await expect(checkoutOverviewPage.totalLabel).toContainText(order.total);

            const checkoutCompletePage = await checkoutOverviewPage.finish();

            await expect(checkoutCompletePage.title).toBeVisible();
            await expect(checkoutCompletePage.title).toHaveText('Checkout: Complete!');

            await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
            await expect(checkoutCompletePage.completeText).toBeVisible();

            // The order is placed, so the basket is emptied.
            await expect(checkoutCompletePage.basketCount).toBeHidden();
        });
});
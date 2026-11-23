import {expect, test} from '@playwright/test';
import {LoginPage} from '../../src/pages/login.page';
import {Users} from '../../src/data/users';
import {Products} from "../../src/data/product";
import {Customers} from "../../src/data/customer";

test.describe('Product order e2e', () => {
    test('Order a single product',
        async ({page}) => {

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

            await checkoutInformationPage.enterFirstName(Customers.standard.firstName);
            await checkoutInformationPage.enterLastName(Customers.standard.lastName);
            await checkoutInformationPage.enterPostalCode(Customers.standard.postalCode);

            const checkoutOverviewPage = await checkoutInformationPage.submitExpectingSuccess();

            await expect(checkoutOverviewPage.title).toBeVisible();
            await expect(checkoutOverviewPage.title).toHaveText('Checkout: Overview');

            await expect(checkoutOverviewPage.cartItems).toHaveCount(1);

            const overviewItem = checkoutOverviewPage.getCheckoutItemByName(Products.bikeLight.name);

            await expect(overviewItem.productName).toHaveText(Products.bikeLight.name);
            await expect(overviewItem.productDescription).toHaveText(Products.bikeLight.description);
            await expect(overviewItem.productPrice).toHaveText(Products.bikeLight.price);

            // A single line item, so the item total is that product's price.
            await expect(checkoutOverviewPage.subtotalLabel).toContainText(Products.bikeLight.price);
        });
});

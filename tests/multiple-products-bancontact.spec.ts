import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProductPage } from '../src/pages/ProductPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { PaymentPage } from '../src/pages/PaymentPage';
import { BILLING_DETAILS, BANCONTACT_CARD } from '../src/helpers/test-data';

test('Multiple products with Bancontact', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);

  await homePage.navigateToStore();
  await homePage.selectMen();
  const addedProductNames = await homePage.addTwoProductsToCart(page);
  console.log('Added Product Names:', addedProductNames);
});
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
  
  // Add first product
  await homePage.selectProduct();
  await productPage.addToCart();
  
  // Add second product
  await page.goBack();
  await homePage.selectProduct();
  await productPage.addToCart();

  await cartPage.proceedToCheckout();
  await checkoutPage.fillBillingDetails(BILLING_DETAILS);
  await paymentPage.selectPaymentMethod('bancontact');
  
  // Fill Bancontact card details
  await page.fill('input[name="cardholder"]', BILLING_DETAILS.name);
  await page.fill('input[name="cardnumber"]', BANCONTACT_CARD.cardNumber);
  await page.fill('input[name="exp-date"]', BANCONTACT_CARD.expiryDate);
  await paymentPage.placeOrderButton.click();

  // Finalize payment
  await page.click('text="Yes"');
  await expect(page.locator('text="Order successfully placed"')).toBeVisible();
});
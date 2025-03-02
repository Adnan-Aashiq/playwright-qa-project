import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProductPage } from '../src/pages/ProductPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { PaymentPage } from '../src/pages/PaymentPage';
import { BILLING_DETAILS, BANCONTACT_CARD } from '../src/helpers/test-data';
import { OrderConfirmationPage } from '../src/pages/OrderConfirmationPage';

test('Multiple products with Bancontact', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage = new PaymentPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);

  await homePage.navigateToStore();
  await homePage.selectMen();
  const selectedProductName = await homePage.addProductsToCart(page, { quantity: 2 });
  
  await productPage.clickOnCart();
  await productPage.viewAndEditCart();

  await cartPage.verifyProductsInCart(selectedProductName);
  await cartPage.proceedToCheckout();
  
  await checkoutPage.fillBillingDetails(BILLING_DETAILS);
  await checkoutPage.clickNext();
  
  await paymentPage.selectPaymentMethod('bancontact');
  await paymentPage.clickPlaceOrder('bancontact');
  await paymentPage.fillBancontactDetails(BANCONTACT_CARD);

  await orderConfirmationPage.verifyOrderStatus('bancontact');
  await orderConfirmationPage.proceedToCheckout();
});
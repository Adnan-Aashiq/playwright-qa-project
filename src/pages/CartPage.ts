import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;
  readonly productNameInCart: Locator
  private readonly SHIPPING_URL = '/checkout/#shipping';

  constructor(page: Page) {
    this.page = page;
    this.productNameInCart = page.locator('.cart.item .product-item-name');
    this.proceedToCheckoutButton = page.locator("button[data-role='proceed-to-checkout']");
  }

  async verifyProductInCart(selectedProductName: string) {
    await expect(this.productNameInCart).toBeVisible();
    await expect(this.productNameInCart).toHaveText(selectedProductName);
  }

  async proceedToCheckout() {
    await this.page.waitForSelector("button[data-role='proceed-to-checkout']", { state: 'visible', timeout: 50000 });
    await this.page.waitForTimeout(5000);
    await this.proceedToCheckoutButton.click();
  }
}
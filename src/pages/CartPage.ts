import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;
  readonly productNameInCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameInCart = page.locator(".cart.item .product-item-name a");
    this.proceedToCheckoutButton = page.locator(
      "button[data-role='proceed-to-checkout']"
    );
  }

  async verifyProductsInCart(addedProducts: string[]) {
    const cartProductNames = this.productNameInCart;
    await expect(cartProductNames).toHaveCount(addedProducts.length);
    const actualProducts = await cartProductNames.allTextContents();
    const cleanedProducts = actualProducts.map((name) => name.trim());
    expect(cleanedProducts).toEqual(expect.arrayContaining(addedProducts));
  }

  async proceedToCheckout() {
    await this.page.waitForSelector("button[data-role='proceed-to-checkout']", {
      state: "visible",
      timeout: 50000,
    });
    await this.page.waitForTimeout(5000);
    await this.proceedToCheckoutButton.click();
  }
}

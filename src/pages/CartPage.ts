import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;
  readonly productNameInCart: Locator

  constructor(page: Page) {
    this.page = page;
    this.productNameInCart = page.locator('.cart.item .product-item-name a');
    this.proceedToCheckoutButton = page.locator("button[data-role='proceed-to-checkout']");
  }

  async verifyProductsInCart(addedProducts: string[]) {
    // Get all product name elements in cart
    const cartProductNames = this.productNameInCart;
    
    // Verify product count matches
    await expect(cartProductNames).toHaveCount(addedProducts.length);
    
    // Get all product texts
    const actualProducts = await cartProductNames.allTextContents();
    const cleanedProducts = actualProducts.map(name => name.trim());
  
    // Verify all products exist (order-agnostic)
    expect(cleanedProducts).toEqual(expect.arrayContaining(addedProducts));
  
    // For order-sensitive verification (if needed)
    // expect(cleanedProducts).toEqual(addedProducts);
  }

  async proceedToCheckout() {
    await this.page.waitForSelector("button[data-role='proceed-to-checkout']", { state: 'visible', timeout: 50000 });
    await this.page.waitForTimeout(5000);
    await this.proceedToCheckoutButton.click();
  }
}
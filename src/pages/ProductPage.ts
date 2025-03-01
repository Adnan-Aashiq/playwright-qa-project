import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartCounter: Locator;
    readonly sizeList: Locator;
    readonly colorList: Locator;
    readonly successMessage: Locator;
    readonly cartButton: Locator;
    readonly viewAndEditCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('#product-addtocart-button');
    this.cartCounter = page.locator('.counter-number');
    this.sizeList = page.locator('.swatch-option.text');
    this.colorList = page.locator('.swatch-option.color');
    this.successMessage = page.locator('div[data-bind*="prepareMessageForHtml"]');
    this.cartButton = page.locator('.action.showcart');
    this.viewAndEditCartLink = page.locator('.action.viewcart');
  }

    async selectSize() {
        await this.sizeList.first().click();
    }

    async selectColor() {
        await this.colorList.first().click();
    }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async verifyAddedProduct(productName: string) {
  await this.page.waitForSelector('div.message-success', { state: 'visible', timeout: 15000 });
  await expect(this.successMessage).toContainText(`You added ${productName} to your`, {
    timeout: 15000,
    ignoreCase: true 
  });
    
  }

  async clickOnCart() {
    await this.cartButton.click();
  }

  async viewAndEditCart() {
    await this.viewAndEditCartLink.click();
}
}
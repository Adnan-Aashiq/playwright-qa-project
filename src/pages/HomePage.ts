import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly productLink: Locator;
    readonly menMenu: Locator;
    private productName: string;

  constructor(page: Page) {
    this.page = page;
    this.productLink = page.locator('.product-item-info').first();
    this.menMenu = page.locator("a[href*='/men.html']");
  }

  async navigateToStore() {
    await this.page.goto('https://m2-support.plugins.buckaroo.io/');
  }

  async selectMen() {
    await this.menMenu.click();
  }

  async selectProduct(): Promise<string> {
    // Get product name before clicking
    const productNameElement = this.productLink.locator('.product-item-name .product-item-link');
    this.productName = await productNameElement.innerText();
    await this.productLink.click();
    return this.productName.trim(); // Return for direct usage
  }
}
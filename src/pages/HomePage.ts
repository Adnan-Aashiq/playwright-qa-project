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

async addTwoProductsToCart(page: Page): Promise<string[]> {
  const productNames: string[] = [];
  const productsLocator = page.locator('.product-item-info');
  
  // Ensure there are at least two products on the page
  const count = await productsLocator.count();
  if (count < 2) {
    throw new Error('Not enough products available to add to cart.');
  }
  
  // Loop through the first two products
  for (let i = 0; i < 2; i++) {
    const product = productsLocator.nth(i);
    
    // Hover on the product to reveal interactive elements
    await product.hover();
    
    // Select a size: Click on the first size option
    const sizeOption = product.locator('.swatch-attribute.size .swatch-option').first();
    await sizeOption.waitFor({ state: 'visible', timeout: 5000 });
    await sizeOption.click();
    
    // Select a color: Click on the first color option
    const colorOption = product.locator('.swatch-attribute.color .swatch-option').first();
    await colorOption.waitFor({ state: 'visible', timeout: 5000 });
    await colorOption.click();
    
    // Save the product name from the product name link
    const nameLocator = product.locator('.product-item-name a');
    const productName = (await nameLocator.innerText()).trim();
    productNames.push(productName);
    
    // Click on the Add to Cart button
    const addToCartButton = product.locator('button.action.tocart');
    await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });
    await addToCartButton.click();
    
    // Optionally, wait for a confirmation element to ensure the product was added
    // e.g., await page.locator('.cart-confirmation').waitFor({ state: 'visible', timeout: 5000 });
  }
  
  return productNames;
}

}
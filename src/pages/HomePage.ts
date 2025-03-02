import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly productLink: Locator;
  readonly menMenu: Locator;
  private productName: string;

  constructor(page: Page) {
    this.page = page;
    this.productLink = page.locator(".product-item-info").first();
    this.menMenu = page.locator("a[href*='/men.html']");
  }

  async navigateToStore() {
    await this.page.goto("/");
  }

  async selectMen() {
    await this.menMenu.click();
  }

  async addProductsToCart(
    page: Page,
    options: {
      quantity: number;
      hoverInteraction?: boolean;
      sizeSelector?: string;
      colorSelector?: string;
    }
  ): Promise<string[]> {
    const {
      quantity,
      hoverInteraction = true,
      sizeSelector = ".swatch-attribute.size .swatch-option:visible",
      colorSelector = ".swatch-attribute.color .swatch-option:visible",
    } = options;

    const productNames: string[] = [];
    const productsLocator = page.locator(".product-item-info");

    const availableProducts = await productsLocator.count();
    if (availableProducts < quantity) {
      throw new Error(
        `Requested ${quantity} products, but only ${availableProducts} available`
      );
    }

    for (let i = 0; i < quantity; i++) {
      const product = productsLocator.nth(i);

      if (hoverInteraction) {
        await product.hover();
        await page.waitForTimeout(500); // Brief pause for UI stabilization
      }

      const sizeOptions = product.locator(sizeSelector);
      await sizeOptions.first().click();

      const colorOptions = product.locator(colorSelector);
      await colorOptions.first().click();

      const name = await product
        .locator(".product-item-name a")
        .innerText()
        .then((t) => t.trim());
      productNames.push(name);

      const addButton = product.locator("button.action.tocart:visible");
      await addButton.click();

      await page.waitForSelector(".message-success", { state: "visible" });
    }

    return productNames;
  }
}

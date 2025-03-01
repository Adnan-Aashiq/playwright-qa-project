import { Page, Locator, expect } from '@playwright/test';

export class OrderConfirmationPage {
  readonly page: Page;
    readonly statusMessage: Locator;
    readonly submitStatusButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.statusMessage = page.locator("select[name='sc']");
    this.submitStatusButton = page.locator("input[value='Submit status']");
  }

    async verifyOrderStatus() {
        this.page.waitForLoadState('domcontentloaded')
        // Get the text content and trim whitespace
const actualStatus = await this.statusMessage.textContent();
const cleanedStatus = actualStatus?.trim();

// Perform assertion with explicit comparison
expect(cleanedStatus).toContain("190 - Success");
    }

  async proceedToCheckout() {
    await this.submitStatusButton.click();
  }
}
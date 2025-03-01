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
        await this.page.waitForSelector("select[name='sc']", { state: 'visible', timeout: 30000 });
const actualStatus = await this.statusMessage.textContent();
const cleanedStatus = actualStatus?.trim();

// Perform assertion with explicit comparison
expect(cleanedStatus).toContain("190 - Success");
    }

  async proceedToCheckout() {
    await this.submitStatusButton.click();
  }

  async verifySuccessMessage() {
    await this.page.waitForSelector('.message-success.success.message', { state: 'visible', timeout: 30000 });
    await expect(this.page.locator('.message-success.success.message')).toHaveText('Your order has been placed successfully.');
  }
}
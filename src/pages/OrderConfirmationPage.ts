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

  async verifyOrderStatus(paymentMethod: 'ideal' | 'bancontact') {
    // Wait for status container
    await this.page.waitForSelector("select[name='sc']", { 
        state: 'visible', 
        timeout: 30000 
    });

    // Get and clean status text
    const actualStatus = await this.statusMessage.textContent();
    const cleanedStatus = actualStatus?.trim() || '';

    // Determine expected status based on payment method
    const expectedStatus = {
        ideal: "190 - Success",
        bancontact: "Y - Yes"
    }[paymentMethod.toLowerCase() as keyof typeof expectedStatus];

    if (!expectedStatus) {
        throw new Error(`Invalid payment method: ${paymentMethod}`);
    }

    // Perform assertion with dynamic expected value
    expect(cleanedStatus).toContain(
        expectedStatus,
    );
}

  async proceedToCheckout() {
    await this.submitStatusButton.click();
  }

  async verifySuccessMessage() {
    await this.page.waitForSelector('.message-success.success.message', { state: 'visible', timeout: 30000 });
    await expect(this.page.locator('.message-success.success.message')).toHaveText('Your order has been placed successfully.');
  }
}
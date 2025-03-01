import { Page, Locator, expect } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly idealOption: Locator;
  readonly bancontactOption: Locator;
  readonly bankSelection: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.idealOption = page.locator('#buckaroo_magento2_ideal');
    this.bancontactOption = page.locator('text="Bancontact"');
    this.bankSelection = page.locator(".buckaroo_magento2_ideal .bank-types").first();
    this.placeOrderButton = page.locator('#button-action-checkout-ideal');
  }

  async selectPaymentMethod(method: 'ideal' | 'bancontact') {
    this.page.waitForLoadState('domcontentloaded')

    // Wait for payment methods container to be visible
    await this.page.locator('.payment-group').waitFor({ state: 'visible', timeout: 50000 });
  
    if (method === 'ideal') {
      // Wait for iDEAL option to be clickable
      await this.idealOption.waitFor({ state: 'visible', timeout: 50000 });
      await this.idealOption.click();
      
      // Wait for bank selection dropdown to appear
      await this.bankSelection.waitFor({ state: 'attached', timeout: 50000 });
      await this.bankSelection.click();
      
      // Wait for bank list to be fully interactive
      //await this.page.locator('.bank-list-container').waitFor({ state: 'visible' });
    } else {
      // Wait for Bancontact option to be ready
      await this.bancontactOption.waitFor({ state: 'attached', timeout: 50000 });
      await this.bancontactOption.scrollIntoViewIfNeeded();
      await this.bancontactOption.click({ force: true });
    }
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }
}
import { Page, Locator, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly idealOption: Locator;
  readonly bancontactOption: Locator;
  readonly bankSelection: Locator;
  readonly placeOrderButtonBancontact: Locator;
  readonly placeOrderButtonIdeal: Locator;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly payNow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.idealOption = page.locator("#buckaroo_magento2_ideal");
    this.bancontactOption = page.locator('text="Bancontact"');
    this.bankSelection = page
      .locator(".buckaroo_magento2_ideal .bank-types")
      .first();
    this.placeOrderButtonIdeal = page.locator("#button-action-checkout-ideal");
    this.placeOrderButtonBancontact = page.locator(
      "#button-action-checkout-mrcash"
    );
    this.nameOnCard = page.locator("input[placeholder='Name on card']");
    this.cardNumber = page.locator("input[placeholder='Card number']");
    this.expiryMonth = page.locator("input[placeholder='MM']");
    this.expiryYear = page.locator("input[placeholder='YY']");
    this.payNow = page.locator("button[type='submit'] .button-text");
  }

  async selectPaymentMethod(method: "ideal" | "bancontact") {
    await this.page.waitForSelector(".payment-group", {
      state: "visible",
      timeout: 30000,
    });

    if (method === "ideal") {
      this.page.waitForSelector("#buckaroo_magento2_ideal", { 
        state: "visible", 
        timeout: 30000 
      })
      .then(() => this.idealOption.click())
      .then(() => this.page.waitForSelector(".buckaroo_magento2_ideal .bank-types", {
        state: "visible",
        timeout: 30000
      }))
      .then(() => this.bankSelection.click())
      .catch(error => {
        console.error('Error in promise chain:', error);
        throw error; // Re-throw to maintain test failure
      });
    } else {
      this.page.waitForSelector('text="Bancontact"', { 
        state: "visible", 
        timeout: 30000 
      })
      .then(() => this.bancontactOption.scrollIntoViewIfNeeded())
      .then(() => this.bancontactOption.click({ force: true }))
      .catch(error => {
        console.error('Bancontact flow failed:', error);
        throw error;
      });
    }
  }

  async clickPlaceOrder() {
    await this.page.getByRole("button", { name: "Place Order" }).click();
  }

  async fillBancontactDetails(card: {
    name: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.nameOnCard.fill(card.name);
    await this.cardNumber.fill(card.cardNumber);
    await this.expiryMonth.fill(card.expiryMonth);
    await this.expiryYear.fill(card.expiryYear);
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.clickTopRightCorner();
    await this.payNow.click();
  }

  async clickTopRightCorner() {
    const viewport = this.page.viewportSize() || { width: 1280, height: 720 };
    const x = viewport.width - 1; // Right-most pixel
    const y = 1; // Top-most pixel
    await this.page.mouse.click(x, y);
  }
}

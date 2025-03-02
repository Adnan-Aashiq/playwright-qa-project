import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly countryInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly postalCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly nextButton: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#customer-email");
    this.firstNameInput = page.locator("input[name='firstname']");
    this.lastNameInput = page.locator("input[name='lastname']");
    this.countryInput = page.locator("select[name='country_id']");
    this.addressInput = page.locator('input[name="street[0]"]');
    this.cityInput = page.locator("input[name='city']");
    this.postalCodeInput = page.locator("input[name='postcode']");
    this.phoneInput = page.locator("input[name='telephone']");
    this.nextButton = page.locator(".button.action.continue.primary");
  }

  async fillBillingDetails(details: {
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  }) {
    await this.emailInput.fill(details.email);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.countryInput.selectOption(details.country);
    await this.cityInput.fill(details.city);
    await this.postalCodeInput.fill(details.postalCode);
    await this.phoneInput.fill(details.phone);
  }

  async clickNext() {
    await this.nextButton.waitFor({ state: "visible", timeout: 50000 });
    await this.nextButton.scrollIntoViewIfNeeded();
    await this.nextButton.click();
    await this.page.waitForURL("**/checkout/#payment");
  }
}

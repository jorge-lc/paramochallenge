/// <reference types="cypress" />

import BasePage from "./basePage";

class RegistrationSuccessPage extends BasePage {
  //getters

  getSuccessTitle() {
    return cy.get(".notification__title");
  }

  getSuccessMessage() {
    return cy.get(".notification__description");
  }

  //operations

  // This function use both getters to assert that the corresponding
  // success message shows up. Also assert that URL is correct
  verifySignUpSuccess() {
    const title = " Congratulations! ";
    const message = " Registration successfully finished! Confirmation has been sent to you. ";

    this.getSuccessTitle().contains(title);
    this.getSuccessMessage().contains(message);
  }
}

module.exports = RegistrationSuccessPage;

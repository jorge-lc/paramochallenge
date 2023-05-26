/// <reference types="cypress" />

import BasePage from "./basePage";

class SignInPagePage extends BasePage {
  //getters
  getUsernameField() {
    return cy.get("input[data-test='input-username']");
  }

  getPasswordField() {
    return cy.get("input[data-test='input-password']");
  }

  getSignInButton() {
    return cy.get("button[data-test='control-submit']");
  }

  //operations

  // This function will introduce all the info in order to Sign In
  signIn() {
    cy.readFile("cypress/fixtures/userInfoSignIn.json").then((json) => {
      this.getUsernameField().type(json.email);
      this.getPasswordField().type(json.password);
      this.getSignInButton().click();
    });
  }
}

module.exports = SignInPagePage;

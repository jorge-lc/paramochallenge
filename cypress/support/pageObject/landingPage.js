/// <reference types="cypress" />

import BasePage from "./basePage";

class LandingPage extends BasePage {
  //getters

  getWelcomeModal() {
    return cy.get("#welcome_modal");
  }

  getSignUpButton() {
    return cy.get("a[data-test='nav-reg-head']");
  }

  getSignInButton() {
    return cy.get(".login > .header-button--login");
  }

  getSignInModalButton() {
    return cy.get("a[data-test='nav-login-head']");
  }

  getModalConfirmButton() {
    return cy.get(".modal__buttons > .button--t1");
  }

  getUserInfoAvatar() {
    return cy.get(".user-avatar__wrapper");
  }

  //operations

  // This function will wait for the welcome modal and then
  // it will take us to Sign Up page
  goToRegistration() {
    this.getSignUpButton().click();
  }

  // This function will wait for the welcome modal and then
  // it will take us to Sign In page
  goToSignIn() {
    this.getSignInButton()
      .click()
      .then(() => {
        this.getSignInModalButton().click();
      });
  }

  // This function will assert that the login button is no longer visible
  // and that the Info Avatar element is displayed
  validateSuccessSignIn() {
    this.getSignInButton().should("not.exist");
    this.getUserInfoAvatar().should("be.visible");
  }
}

module.exports = LandingPage;

/// <reference types="cypress" />

import BasePage from "./basePage";

class RegistrationPage extends BasePage {
  //getters

  getEmailField() {
    return cy.get("input[data-test='input-email']");
  }

  getCurrencyField() {
    return cy.get("select[data-test='input-currency']", { force: true });
  }

  getPasswordField() {
    return cy.get("input[data-test='input-password']");
  }

  getConfirmationPasswordField() {
    return cy.get("input[data-test='input-password_confirmation']");
  }

  getBonusField() {
    return cy.get("input[data-test='input-promo_code']");
  }

  getNoBonusField() {
    return cy.get("input[data-test='input-bonus']");
  }

  getCreateAccountButton() {
    return cy.get("button[data-test='control-submit']");
  }

  getAgreementCheck() {
    return cy.get("input[data-test='input-terms_and_conditions']");
  }

  //operations

  // This function will introduce all the data in each field. Also it will save
  // the generated data in a JSON file in /fixtures folder
  signUp() {
    const dynamicInfo = Date.now();
    const email = `user${dynamicInfo}@gmail.com`;
    const currency = "EUR";
    const password = this.generatePassword(10);
    const bonus = false;

    this.getEmailField().type(email);
    this.getAgreementCheck().check({ force: true });
    this.getCurrencyField().select(currency, { force: true });
    this.getPasswordField().type(password);
    this.getConfirmationPasswordField().type(password);
    this.selectBonus(bonus);
    this.getCreateAccountButton().click();

    const userInfo = {
      email: email,
      currency: currency,
      password: password,
      bonus: bonus,
    };

    cy.writeFile("cypress/fixtures/userInfoSignUp.json", JSON.stringify(userInfo));
  }

  // This function validates if the bonus picker option is displayed and if so, it will
  // choose one according the passed value
  selectBonus(state) {
    cy.get("body").then(($body) => {
      if ($body.find("input[data-test='input-promo_code']").length > 0) {
        if (state) {
          this.getBonusField().check({force: true});
        } else {
          this.getNoBonusField().check({force: true});
        }
      }
    });
  }

  // This function will generate a password with each required categorie
  // and a parameterizable length
  generatePassword(size) {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";

    let randomString = "";

    // Add at least one char of each categorie
    randomString += upperChars.charAt(
      Math.floor(Math.random() * upperChars.length)
    );
    randomString += lowerChars.charAt(
      Math.floor(Math.random() * lowerChars.length)
    );
    randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    randomString += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );

    // Generate rest of the String
    while (randomString.length < size) {
      let category = Math.floor(Math.random() * 4); // Choose one random categorie

      switch (category) {
        case 0: // Uppercase
          randomString += upperChars.charAt(
            Math.floor(Math.random() * upperChars.length)
          );
          break;
        case 1: // Lowercase
          randomString += lowerChars.charAt(
            Math.floor(Math.random() * lowerChars.length)
          );
          break;
        case 2: // Numbers
          randomString += numbers.charAt(
            Math.floor(Math.random() * numbers.length)
          );
          break;
        case 3: // Special chars
          randomString += specialChars.charAt(
            Math.floor(Math.random() * specialChars.length)
          );
          break;
      }
    }

    return randomString;
  }
}

module.exports = RegistrationPage;

/// <reference types="cypress" />

class BasePage {
  // This function will wait for the welcome modal and then will click on Got It button
  waitForPage() {
    cy.waitUntil(() => cy.get("#welcome_modal").should("be.visible")).then(
      () => {
        cy.get(".modal__buttons > .button--t1").click();
      }
    );
  }
}

module.exports = BasePage;

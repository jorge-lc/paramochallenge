/// <reference types='cypress' />
import SignInPage from "../support/pageObject/signInPage";
import LandingPage from "../support/pageObject/landingPage";
import RegistrationPage from "../support/pageObject/registrationPage";
import RegistrationSuccessPage from "../support/pageObject/registrationSuccessPage";

describe("Casino flows", () => {
  let landingPage;
  let registrationPage;
  let registrationSuccessPage;
  let signInPage;

  beforeEach(() => {
    cy.visit("/", { failOnStatusCode: false });    
    cy.viewport(1280, 720);
    landingPage = new LandingPage();
    registrationPage = new RegistrationPage();
    registrationSuccessPage = new RegistrationSuccessPage();
    signInPage = new SignInPage();
    landingPage.waitForPage();
  });

  it("Will sign up a new user", () => {
    landingPage.goToRegistration();
    registrationPage.signUp();
    registrationSuccessPage.verifySignUpSuccess();
  });

  it("Will sign in with a existent user", () => {
    landingPage.goToSignIn();
    signInPage.signIn();
    landingPage.validateSuccessSignIn();
  });
});

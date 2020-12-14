const onboarding = require("../../../locators/Onboarding.json");
const explorer = require("../../../locators/explorerlocators.json");
const homePage = require("../../../locators/HomePage.json");
const loginPage = require("../../../locators/LoginPage.json");

describe("Onboarding", function() {
  it("Sign Up", function() {
    cy.LogOut();

    cy.visit("/user/signup");
    cy.get("input[name='email']").type(Cypress.env("USERNAME"));
    cy.get(loginPage.password).type(Cypress.env("PASSWORD"));
    cy.get(loginPage.submitBtn).click();

    cy.LogintoApp(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));

    cy.generateUUID().then(uid => {
      cy.CreateApp(uid);
    });
  });

  it("Onboarding flow", function() {
    cy.contains(".t--create-database", "Explore Appsmith").click();

    cy.get(onboarding.tooltipAction).click();

    // Add widget
    cy.get(".t--add-widget").click();
    cy.dragAndDropToCanvas("tablewidget", { x: 300, y: -300 });

    cy.get(onboarding.tooltipSnippet).click({ force: true });
    cy.testJsontext("tabledata", "{{ExampleQuery.data}}");
    cy.closePropertyPane();
    cy.get(explorer.closeWidgets).click();

    cy.openPropertyPane("tablewidget");
    cy.get(onboarding.tooltipAction).click({ force: true });

    cy.get(homePage.publishButton).click();

    cy.get(homePage.closeBtn).click();
    cy.get(".t--continue-on-my-own").click();
  });
});

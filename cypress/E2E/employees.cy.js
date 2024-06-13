/* eslint-disable no-undef */
beforeEach(() => {
  cy.visit("http://localhost:5173/Employees");
});

/**
 * Home page
 */
describe("Employees page", () => {
  it("title should be visible", () => {
    cy.get(".headerTitle").should("be.visible");
  });

  it("Search should be visible", () => {
    cy.get(".searchSection").should("be.visible");
  });
  it("show should be visible", () => {
    cy.get(".showSection").should("be.visible");
  });
  it("home btn save should be visible", () => {
    cy.get('[data-testid="home"]').should("be.visible");
  });
  it("go to Home page ", () => {
    cy.get('[data-testid="home"]').click();
    cy.get(".homePage").should("be.visible");
  });
});

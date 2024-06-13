/* eslint-disable no-undef */
beforeEach(() => {
  cy.visit("http://localhost:5173");
});

/**
 * Home page
 */
describe("Home page", () => {
  it("title should be visible", () => {
    cy.get(".headerTitle").should("be.visible");
  });

  it("Create Employee should be visible", () => {
    cy.get("h2").should("be.visible");
  });

  it("form should be visible", () => {
    cy.get("form").should("be.visible");
  });
  it("btn save should be visible", () => {
    cy.get(".btn").should("be.visible");
  });
  it("go to Employees page ", () => {
    cy.get('[data-testid="viewEmployees"]').click();
    cy.get(".headerTitle").should("be.visible");
  });
});

/* eslint-disable no-undef */
beforeEach(() => {
  cy.visit("http://localhost:5173");
});

/**
 * Helper function to fill the form
 * @param {Object} exclude - Object containing the field to exclude
 */
function fillForm(exclude = {}) {
  if (!exclude.firstName) cy.get("#first-name").type("John");
  if (!exclude.lastName) cy.get("#last-name").type("Doe");
  if (!exclude.dateOfBirth) {
    cy.get("#dateOfBirth").type("1980-01-01");
    cy.get("#dateOfBirth").type("{enter}"); // Close date picker
  }
  if (!exclude.street) cy.get("#street").type("123 Main St");
  if (!exclude.zipCode) cy.get("#zip-code").type("10001");
  if (!exclude.city) cy.get("#city").type("New York");
  if (!exclude.startDate) {
    cy.get("#startDate").type("2024-06-15");
    cy.get("#startDate").type("{enter}"); // Close date picker
  }
  if (!exclude.state) {
    // Select the state by clicking the dropdown and selecting an option
    cy.get(
      ".address > .select-container > .select > .css-13cymwt-control > .css-4xgw5l-IndicatorsContainer2 > .css-1xc3v61-indicatorContainer"
    ).click();
    cy.get("#react-select-2-listbox").contains("Alabama").click();
  }
  if (!exclude.department) {
    cy.get(
      ":nth-child(8) > .select > .css-13cymwt-control > .css-4xgw5l-IndicatorsContainer2 > .css-1xc3v61-indicatorContainer"
    ).click();
    cy.get("#react-select-3-listbox").contains("Sales").click();
  }
}

/**
 * Scenario 1
 */
describe("Form validation when required fields are missing", () => {
  it("should display an error when the first name is missing", () => {
    fillForm({ firstName: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the last name is missing", () => {
    fillForm({ lastName: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the date of birth is missing", () => {
    fillForm({ dateOfBirth: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the start date is missing", () => {
    fillForm({ startDate: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the department is missing", () => {
    fillForm({ department: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the street is missing", () => {
    fillForm({ street: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the city is missing", () => {
    fillForm({ city: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the state is missing", () => {
    fillForm({ state: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });

  it("should display an error when the zip code is missing", () => {
    fillForm({ zipCode: true });
    cy.get(".btn").should("be.visible");
    cy.get(".btn").click();
    cy.get(".toastify").should("be.visible");
    cy.get(".toastify").should("contain", "Please fill out the form correctly");
  });
});

/**
 * Scenario 2
 */

describe("Form validation success", () => {
  it("should display modal confirmation when form is filled correctly", () => {
    fillForm();
    cy.get(".btn").click();
    cy.get(".modal-container").should("be.visible");
    cy.get(".close-btn").click();
  });
});

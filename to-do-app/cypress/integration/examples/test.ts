//cypress, finallyyy - Spec (=== test)

let testItem = "Groceries";

describe("CRUD operations for ToDo items in list", () => {
  it("Check that app is accessible", () => {
    cy.visit("http://localhost:5173/");
  });

  it("Add To do item", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#add-todo").type(testItem);
    cy.get("button.bg-gray-100")
      .click()
      .then(() => {
        cy.get(".todos").last().contains(testItem);
      });
  });

  it("Delete To do item", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".todos")
      .find(".todo")
      .last()
      .find("button")
      .click()
      .then(() => {
        cy.get(".todos").last().contains(testItem).should("have.length", 0);
      });
  });
});

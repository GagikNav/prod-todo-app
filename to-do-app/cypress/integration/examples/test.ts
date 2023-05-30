//cypress, finallyyy - Spec (=== test)

describe("CRUD operations for ToDo items in list", () => {
  let testItem = "Groceries";
  let patchedTestItem = "Groceries2";

  it("Check that app is accessible", () => {
    cy.visit("http://localhost:5173/");
  });

  it("Add To do item", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#add-todo").type(testItem);
    cy.get("button.bg-gray-100")
      .click()
      .then(() => {
        cy.get(".todos")
          .find(".todo>label")
          .last()
          .should("have.text", testItem);
      });
  });

  it("Toggle checkbox of To do item", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".todos")
      .find("[type='checkbox']")
      .last()
      .check()
      .then(() => {
        cy.get(".todos").find("[type='checkbox']").last().should("be.checked");
      });
  });

  it("Edit To do item", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".todos").find(".todo>label").last().should("have.text", testItem);
    cy.get(".todos")
      .find("button.edit-icon")
      .last()
      .click()
      .then(() => {
        cy.get("[type='text']").first().clear().type(patchedTestItem);
        cy.get("button#edit")
          .click()
          .then(() => {
            cy.get(".todos")
              .find(".todo>label")
              .last()
              .should("have.text", patchedTestItem);
          });
      });
  });

  it("Cancel edit for To do item", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".todos")
      .find(".todo>label")
      .last()
      .should("have.text", patchedTestItem);
    cy.get(".todos")
      .find("button.edit-icon")
      .last()
      .click()
      .then(() => {
        cy.get("[type='text']").first().clear().type(patchedTestItem);
        cy.get("button#cancel")
          .click()
          .then(() => {
            cy.get(".todos")
              .find(".todo>label")
              .last()
              .should("have.text", patchedTestItem);
          });
      });
  });

  it("Delete To do item", () => {
    cy.visit("http://localhost:5173/");
    let numberOfItemsWithSameTestName;
    cy.get(".todos")
      .find(".todo")
      .filter((index, $el) => {
        return !!$el.innerHTML.match(new RegExp(patchedTestItem));
      })
      .then(($items) => {
        numberOfItemsWithSameTestName = $items.length;
      });
    cy.get(".todos")
      .find(".todo")
      .last()
      .find("button")
      .last()
      .click()
      .then(() => {
        cy.get(".todos")
          .find(".todo")
          .filter((index, $el) => {
            return !!$el.innerHTML.match(new RegExp(patchedTestItem));
          })
          .should("have.length", numberOfItemsWithSameTestName - 1);
      });
  });
});

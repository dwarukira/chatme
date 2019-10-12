/// <reference types="cypress" />

describe("The App componet", () => {
    context("Should ", () => {
        beforeEach(() => {
            cy.visit("/");
        });


        it("render the home page with the welocme message", () => {
            cy.get(".center h3").should("have.length", 1);
        });

    })
})
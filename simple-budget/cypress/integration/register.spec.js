context("Register", () => {
    it("Should be able to Create Register", () => {
        cy.visit("http://localhost:3000/signup")
        cy.viewport(1440, 900)

        cy.get(":nth-child(3) > #field-1").type("Joao")
        cy.get(":nth-child(5) > #field-1").type("joao@hotmail.com")
        cy.get(":nth-child(7) > #field-1").type("123456")
        cy.get(":nth-child(9) > #field-1").type("123456")
        cy.get("button[type=submit]").click()
    })
})

context("Login", () => {
    it("Should be able to Login", () => {
        cy.visit("http://localhost:3000/login")
        cy.viewport(1440, 900)

        cy.get(":nth-child(3) > #field-1").type("joao@hotmail.com")
        cy.get(":nth-child(5) > #field-1").type("123456")
        cy.get("button[type=submit]").click()
    })
})
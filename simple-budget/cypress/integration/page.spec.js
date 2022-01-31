context("Enters Home Page", () => {
    it("Should be able to redirect to Register Page", () => {
        cy.visit("http://localhost:3000")
        cy.viewport(1440, 900)

        cy.get(".css-uey4a9 > :nth-child(2)").click()
    })
})

context("Create new Register", () => {
    it("Should be able to create a new Register", () => {
        cy.visit("http://localhost:3000/signup")
        cy.get(":nth-child(3) > #field-1").type("teste4")
        cy.get(":nth-child(5) > #field-1").type("teste4@hotmail.com")
        cy.get(":nth-child(7) > #field-1").type("123456")
        cy.get(":nth-child(9) > #field-1").type("123456")
        cy.get(".chakra-button").click()
    })
})

context("Login", () => {
    it("Should be able to Login", () => {
        cy.visit("http://localhost:3000/login")
        cy.get(":nth-child(3) > #field-1").type("teste4@hotmail.com")
        cy.get(":nth-child(5) > #field-1").type("123456")
        cy.get(".css-1546a7e").click()
    })
})
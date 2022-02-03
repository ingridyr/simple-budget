context("Enters Home Page", () => {
    it("Should be able to enter Home Page and redirect to Register Page", () => {
        cy.visit("http://localhost:3000")
        cy.viewport(1440, 900)

        cy.get(".css-16kwn5d").click()
        cy.wait(1000)
    })
})

context("Create new Register", () => {
    it("Should be able to create a new Register", () => {
        cy.visit("http://localhost:3000/signup")
        cy.get(":nth-child(3) > #field-1").type("Cypress Teste")
        cy.get(":nth-child(5) > #field-1").type("teste@hotmail.com")
        cy.get(":nth-child(7) > #field-1").type("123456")
        cy.get(":nth-child(9) > #field-1").type("123456")
        cy.get(".chakra-button").click()
        cy.wait(1000)
    })
})

context("Login", () => {
    it("Should be able to Login", () => {
        cy.visit("http://localhost:3000/login")
        cy.get(":nth-child(3) > #field-1").type("teste@hotmail.com")
        cy.get(":nth-child(5) > #field-1").type("123456")
        cy.get("button[type=submit]").click()
        cy.wait(1000)
    })
})

context("Enters Dashboard Page" , () => {
    it("Should be able to Create a new Budget", () => {
        cy.get(":nth-child(4) > .css-q5xwgn").click()
        cy.get("#field-8").type("Escola")
        cy.get("#field-9").type("2400")
        cy.get("button[type=submit]").click()
        cy.wait(1000)
    })

    it("Should be able to Add new Expense", () => {
        cy.contains("Add expense").click()
        cy.get("select").select("Food")
        cy.get(":nth-child(3) > #field-17").type("Alimentação")
        cy.get(":nth-child(5) > #field-17").type("Despesa destinado à comida da criança")
        cy.get(":nth-child(7) > #field-17").type("350")
        cy.get("button[type=submit]").click()
        cy.wait(1000)
    })

    it("Should be able to View Expenses", () => {
        cy.contains("View expenses").click()
        cy.get('.css-zw1ept > [viewBox="0 0 1024 1024"] > path').click()
        cy.wait(1000)
    })

    it("Should be able to Edit Expense", () => {
        cy.wait(1000)
        cy.get("#field-19").clear().type("Alimentação Mensal")
        cy.get("#field-20").clear().type("Despesa destinado à comida mensal na escola")
        cy.get("#field-21").clear().type("600")
        cy.get("button[type=submit]").click()
        cy.get("#chakra-modal-18 > .chakra-modal__close-btn > .chakra-icon > path").click()
        cy.wait(1000)
    })

    it("Should be able to Delete Expense", () => {
        cy.get('.css-zw1ept > [viewBox="0 0 448 512"] > path').click()
        cy.get(".chakra-modal__close-btn").click()
        cy.wait(1000)
    })

    it("Should be able to Delete Budget", () => {
        cy.get(".css-7g5sjm > path").click()
        cy.wait(1000)
    })

    it("Should be able to Logout", () => {
        cy.get(":nth-child(4) > .css-tvs47z > svg").click()
        cy.wait(1000)
    })
})

import { faker } from `@faker-js/faker`

class Cadastro {
    preencherFormularioDeCadastroCompleto() {
    cy.get('input[type=radio]').check('Mrs')

    cy.get('input#password').type('123' , { log: false }) //log: false usado para nao exibir os dados da senha

    cy.get('[data-qa=days]').select('20')
    cy.get('select[data-qa=months]').select('September')
    cy.get('[data-qa=years]').select('1992')

    cy.get('input[type=checkbox]#newsletter').check()
    cy.get('input[type=checkbox]#optin').check()
    
    cy.get('input#first_name').type(firstName)
    cy.get('input#last_name').type(lastName)
    cy.get('input#company').type(`PGATS ${faker.company.name()}`)
    cy.get('input[data-qa=address]').type(faker.location.streetAddress())
    cy.get('select[data-qa=country]').select('Canada')
    cy.get('input#state').type(faker.location.state())
    cy.get('input#city').type(faker.location.city())
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
    cy.get('[data-qa="mobile_number"]').type('11 99856 3254')

    // Triplo A - Arrange - Act, Assert

    //Act
    cy.get('[data-qa="create-account"]').click()

    }
}

    export default new Cadastro()


/// <reference types="cypress" />

describe('Automation Exercise', () => {
  it('Cadastrar um usuario', () => {
    const timestamp = new Date().getTime()

    cy.viewport(400, 700)

    cy.visit('https://automationexercise.com/')

    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="signup-name"]').type('QA Tester')
    cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
    cy.contains('button', 'Signup').click()

    // radio ou checkboxes -> check
    // cy.get('#id_gender2).check()
    cy.get('input[type=radio]').check('Mrs')

    cy.get('input#password').type('123' , { log: false }) //log: false usado para nao exibir os dados da senha

    //para comboboxes ou selects -> select
    cy.get('[data-qa=days]').select('20')
    cy.get('select[data-qa=months]').select('September')
    cy.get('[data-qa=years]').select('1992')

    cy.get('input[type=checkbox]#newsletter').check()
    cy.get('input[type=checkbox]#optin').check()
    
    cy.get('input#first_name').type('QA')
    cy.get('input#last_name').type('Tester')
    cy.get('input#company').type('PGATS')
    cy.get('input[data-qa=address]').type('Rua da Consolacao, n 2004')
    cy.get('select[data-qa=country]').select('Canada')
    cy.get('input#state').type('California')
    cy.get('input#city').type('Los Angeles')
    cy.get('[data-qa="zipcode"]').type('11058774')
    cy.get('[data-qa="mobile_number"]').type('11 99856 3254')

    // Triplo A - Arrange - Act, Assert

    //Act
    cy.get('[data-qa="create-account"]').click()

     //Assert
    cy.url().should('includes', 'account_created') //valida o texto da url
    cy.get('b').contains('Account Created!') //valida se na pagina existe esse texto ou cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');

    // consulta ao banco ao api
    


  }) 
})
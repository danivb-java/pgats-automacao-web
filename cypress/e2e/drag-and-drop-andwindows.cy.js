
describe(`Drag ans Drop ans Windows`, () =>  {

    it('Multiple Wondows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.contains('Click Here')
        //executa funcoes no navegador (https://docs.cypress.io/api/commands/invoke)
        .invoke('removeAttr', 'target')
        .click()

        cy.get('h3').should('have.text', 'New Window')

        cy.go('back')
        cy.get('h3').should('have.text', 'Opening a new window')
    });

    it(`Drag and Drop`, () => {
        cy.visit(`https://the-internet.herokuapp.com/drag_and_drop`)

        const dataTransfer = new DataTransfer
        cy.contains('A').trigger('dragstart', { dataTransfer })
        cy.contains('B').trigger('drop', { dataTransfer })


    })
});
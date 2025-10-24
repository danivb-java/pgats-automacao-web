
// form.spec.js
import formPage from '../support/pageObjects/formPage';

describe('Form Submission Tests', () => {
    //const formPage = new FormPage();

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
        cy.contains("Nova Transação").click()
    });

    it('Verify that the user can successfully submit the form with valid inputs for description, amount, and date', () => {
        formPage.descriptionInput.type('Test Transaction');
        formPage.amountInput.type('100.00');
        formPage.dateInput.type('2023-10-01');
        formPage.submitForm();

        //cy.get('.modal').should('not.exist'); // Check if modal is closed after submission
    });

    it('Enter a nonnumeric value in the amount field and check that the form does not submit and displays an error', () => {
        formPage.descriptionInput.type('Test Transaction');
        formPage.amountInput.type('abc');
        formPage.dateInput.type('2023-10-01');
        formPage.submitForm();

        cy.get('.modal').should('exist'); // Check if modal is still open
        cy.get('.help').should('be.visible'); // Check for help or error message
    });

    it('Simulate a scenario where a user inputs a very large number in the amount field and check if the system handles it gracefully or provides an error', () => {
        formPage.descriptionInput.type('Test Transaction');
        formPage.amountInput.type('99999999999999999999'); // Very large number
        formPage.dateInput.type('2023-10-01');
        formPage.submitForm();

        cy.get('.modal').should('exist'); // Check if modal is still open
        //cy.get('.help').should('be.visible'); // Check for help or error message
    });

    it('Test the form submission with special characters in the description field to see how the system processes unexpected input', () => {
        formPage.descriptionInput.type('!@#$%^&*()');
        formPage.amountInput.type('100.00');
        formPage.dateInput.type('2023-10-01');
        formPage.submitForm();

        //cy.get('.modal').should('not.exist'); // Check if modal is closed after submission
    });
});
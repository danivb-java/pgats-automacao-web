

/// <reference types="cypress" />


import userData from '../fixtures/example.json'
import { 
  getRandomNumber,
  getRandomEmail
} from '../support/helpers'

import { faker } from '@faker-js/faker';

//import { navegarParaLogin } from `../modules/menu`
import menu from `../modules/menu`
//import { preencherFormularioDePreCadastro } from `../modules/login`
import login from `../modules/login`
import cadastro from '../modules/cadastro';


describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.viewport(400, 700)
    cy.visit('https://automationexercise.com/')
    //cy.get('a[href="/login"]').click()
    
    //navegarParaLogin()
    menu.navegarParaLogin()
  })

  it('Exemplos de logs', () => {
    cy.log('STEP 1: PGATS AUTOMACAO WEB CY LOG')
    cy.log('STEP 2: PGATS AUTOMACAO WEB CY LOG')

    cy.log(`getRandomNumber: ${getRandomNumber()}`)
    cy.log(`getRandomEmail: ${getRandomEmail()}`)

    cy.log(`FullName: ${ faker.person.fullName()}`)

    cy.log(`Nome do usuario: ${userData.name}`)
    cy.log(`E-mail do usuario: ${userData.email}`)

    console.log('PGATS AUTOMACAO WEB CONSOLE LOG')

  })


  it('Cadastrar um usuario', () => {
    //Arrange
  
    //Preencher o formulario de pre cadastro
    // const firstName = faker.person.firstName()
    // const lastName = faker.person.lastName()

    // cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
    // cy.get('[data-qa="signup-email"]').type(getRandomEmail())
    // cy.contains('button', 'Signup').click()

    //preencherFormularioDePreCadastro()
    login.preencherFormularioDePreCadastro() 
    
    // preencherFormularioDecadastroCompleto
     cadastro.preencherFormularioDeCadastroCompleto()
    // radio ou checkboxes -> check
    // cy.get('#id_gender2).check()
    

     //Assert
    cy.url().should('includes', 'account_created') //valida o texto da url
    cy.get('b').contains('Account Created!') //valida se na pagina existe esse texto ou cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');

    // consulta ao banco ao api
  }) 

  //qa-tester-1759530594068@test.com

  it('Login de usuario com e-mail e senha corretos', () => {

    // cy.get('[data-qa="login-email"]').type('qa-tester-1759532019098@test.com')
    // cy.get('[data-qa="login-password"]').type('123')

    // cy.get('[data-qa="login-button"]').click()
    //cy.get('i.fa-user').parent().should('contain', 'QA Tester')

    login.preencherFormularioDeLogin(userData.user, userData.password)

    // cy.contains('b', 'QA Tester')

  });

  it('Login de usuario com e-mail e senha incorretos', () => {

    // cy.get('[data-qa="login-email"]').type('qa-tester-1759532019098@test.com')
    // cy.get('[data-qa="login-password"]').type('54123')

    // cy.get('[data-qa="login-button"]').click()

    login.preencherFormularioDeLogin(userData.user, `54321`)
    
    cy.get(`.login-form > form > p`).should('contain', 'Your email or password is incorrect!')

  });

  it('Logout de usuario', () => {
    //Arrange

    // cy.get('[data-qa="login-email"]').type('qa-tester-1759532019098@test.com')
    // cy.get('[data-qa="login-password"]').type('123')

    // cy.get('[data-qa="login-button"]').click()

    login.preencherFormularioDeLogin(userData.user, userData.password)

    //cy.contains('b', 'QA Tester')

    cy.get('a[href="/logout"]').click()

    //Act
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')

  });

  it('Cadastrar usuario com e-mail existente no sistema', () => {

    cy.get('[data-qa="signup-name"]').type('QA Tester')
    cy.get('[data-qa="signup-email"]').type('qa-tester-1759532019098@test.com')
    
    cy.contains('button', 'Signup').click()

    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });


    it('Envio de formulario de contato (Contact Us) com upload de arquivo', () => {
    
    cy.get('a[href*=contact]').click()

    cy.get('[data-qa="name"]').type(userData.name)
    cy.get('[data-qa="email"]').type(userData.email)
    cy.get('[data-qa="subject"]').type(userData.subject)
    cy.get('[data-qa="message"]').type(userData.message)

    cy.fixture('example.json').as('arquivo')   
    cy.get('input[type=file]').selectFile('@arquivo')

    cy.get('[data-qa="submit-button"]').click()

    //assert
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
  
  });

  
  /*
  it('Enviar formulário de contato com upload de arquivo', () => {
    cy.visit('https://automationexercise.com/')

    cy.get('a[href="/contact_us"]').click()
    
    cy.url().should('include', '/contact_us')
    cy.contains('h2', 'Get In Touch')

    cy.get('input[name="name"]').type(testData.contactForm.name)
    
    const timestamp = new Date().getTime()
    const emailContato = qa.contact.${timestamp}@example.com
    cy.get('input[name="email"]').type(emailContato)
    
    cy.get('input[name="subject"]').type(testData.contactForm.subject)
    
    cy.get('textarea[name="message"]').type(testData.contactForm.message)

    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/test-image.png')
    
    cy.get('input[name="submit"]').click()

    cy.get('.status')
      .should('contain', 'Success! Your details have been submitted successfully.')
      .should('be.visible')
    
    cy.get('#form-section a[href="/"]').click()
    
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains('AutomationExercise')
  });
  */




})
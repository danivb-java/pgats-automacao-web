

/// <reference types="cypress" />


import userData from '../fixtures/example.json'

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro';


describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.viewport(400, 700)
    cy.visit('https://automationexercise.com/')

    menu.navegarParaLogin()
    //cy.navegarParaLogin()    ---- essa declaracao eh para qdo uso co commands.Nesse caso nao precisa de import e export
  })


  it('Cadastrar um usuario', () => {
    //Arrange
    login.preencherFormularioDePreCadastro() 
    cadastro.preencherFormularioDeCadastroCompleto()

     //Assert
    cy.url().should('includes', 'account_created') //valida o texto da url
    cy.get('b').contains('Account Created!') //valida se na pagina existe esse texto ou cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
    }) 


  it('Login de usuario com e-mail e senha corretos', () => {

    login.preencherFormularioDeLogin(userData.user, userData.password)
    cy.get('i.fa-user').parent().should('contain', userData.name)
    cy.get('a[href="/logout"]').should('be.visible')

  });

  it('Login de usuario com e-mail e senha incorretos', () => {
    login.preencherFormularioDeLogin(userData.user, `54321`)   
    cy.get(`.login-form > form > p`).should('contain', 'Your email or password is incorrect!')

  });

  it('Logout de usuario', () => {

    login.preencherFormularioDeLogin(userData.user, userData.password)
    cy.get('a[href="/logout"]').click()
    //Act
    menu.efetuarLogout()
    //Assert
    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')
  });


  it('Cadastrar usuario com e-mail existente no sistema', () => {

    login.preencherFormularioDePreCadastro() 
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });


    it('Envio de formulario de contato (Contact Us) com upload de arquivo', () => {
    
      cadastro.preencherFormularioDeContato()
    //assert
      cy.get('.status').should('be.visible')
      cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
  
  });
})
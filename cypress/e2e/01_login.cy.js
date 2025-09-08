/// <reference types="cypress" />

describe('example test with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/?utm_source=chatgpt.com')
  })

  it('login demo with validations', () => {
   
    //elements exists
    cy.get('#user-name').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')

    //first validatiosn at elements
    cy.get('#user-name').should('have.attr', 'placeholder', 'Username')
    cy.get('#password').should('have.attr', 'placeholder', 'Password')
    cy.get('#login-button').should('have.value', 'Login')


    //actions with elements
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')

    //validations after actions
    cy.get('#user-name').should('have.value', 'standard_user')
    cy.get('#user-name').invoke('val') .should('have.length', 13)
    cy.get('#password').should('have.value', 'secret_sauce')
    cy.get('#password').invoke('val') .should('have.length', 12)

    
    //try login
    cy.get('#login-button').click()
  })
})
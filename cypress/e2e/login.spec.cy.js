/// <reference types="cypress" />
import testdata from '../fixtures/testdata.json'

describe('example test login with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('the elements must exist in the login', () => {
    cy.screenshot("login-001-full-login-form")
    //validate elements
    cy.get('#user-name').should('exist').screenshot("login-002-username-input-element-exist")
    cy.get('#password').should('exist').screenshot("login-003-password-input-element-exist")
    cy.get('#login-button').should('exist').screenshot("login-004-login-button-element-exist")

    //validate placeholder and text
    cy.get('#user-name').should('have.attr', 'placeholder', 'Username').screenshot("login-005-username-placeholder-is-correct")
    cy.get('#password').should('have.attr', 'placeholder', 'Password').screenshot("login-006-password-placeholder-is-correct")
    cy.get('#login-button').should('have.value', 'Login').screenshot("login-007-loginbutton-text-is-correct")

  })

  it('should login successfully with valid credentials', () => {
    //actions
    cy.get('#user-name').type(testdata['valid-username'])
    cy.get('#password').type(testdata['valid-password'])
    cy.get('#login-button').click()

    //assertions after login
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain.text', 'Products')
  })

  it('should show error with invalid credentials', () => {
    //actions
    cy.get('#user-name').type(testdata['invalid-username'])
    cy.get('#password').type(testdata['invalid-password'])
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match')
  })

  it('should show error when fields are empty', () => {
    //actions
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain.text', 'Username is required')
  })
  
})
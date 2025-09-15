/// <reference types="cypress" />

describe('example test with cypress v15.0.0 on saucedemo', () => {
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
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    //assertions after login
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain.text', 'Products')
  })

  it('should show error with invalid credentials', () => {
    //actions
    cy.get('#user-name').type('invalid_user')
    cy.get('#password').type('wrong_password')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match')
  })

  it('should show error when fields are empty', () => {
    //actions
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain.text', 'Username is required')
  })

  it('Validation of error messages', () => {
   
    //elements exists
    cy.get('#user-name').should('exist').screenshot("login-002-username-input-element-exist")
    cy.get('#password').should('exist').screenshot("login-003-password-input-element-exist")
    cy.get('#login-button').should('exist').screenshot("login-004-login-button-element-exist")

    //first validatiosn at elements
    cy.get('#user-name').should('have.attr', 'placeholder', 'Username').screenshot("login-005-username-placeholder-is-correct")
    cy.get('#password').should('have.attr', 'placeholder', 'Password').screenshot("login-006-password-placeholder-is-correct")
    cy.get('#login-button').should('have.value', 'Login').screenshot("login-007-loginbutton-text-is-correct")


    //actions with elements
    cy.get('#user-name').type('standard_user').screenshot("login-008-type-username")
    cy.get('#password').type('secret_sauce').screenshot("login-009-type-password")

    //validations after actions
    cy.get('#user-name').should('have.value', 'standard_user').screenshot("login-010-validate-user")
    cy.get('#user-name').invoke('val') .should('have.length', 13)
    cy.get('#password').should('have.value', 'secret_sauce').screenshot("login-011-validate-password")
    cy.get('#password').invoke('val') .should('have.length', 12)

    
    //try login
    cy.get('#login-button').screenshot("login-012-click-login-button").click()
    
    //validatios after login
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain.text', 'Products').screenshot("login-013-validate-title")
    
    //inventory items
    cy.get('.inventory_item').should('exist').each(($el, index, $list) => {
    cy.wrap($el).screenshot(`login-014-item-${index+1}`);
    });


  })
})
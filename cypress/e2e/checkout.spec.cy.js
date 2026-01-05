/// <reference types="cypress" />
import testdata from '../fixtures/testdata.json'

describe('example test checkout with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type(testdata['valid-username'])
    cy.get('#password').type(testdata['valid-password'])
    cy.get('#login-button').click()

    //add two products to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    //show cart
    cy.get('.shopping_cart_link').click()
  })

  it('fill checkout form and complete purchase', ()=>{
    //screenshot cart
    cy.screenshot('checkout-001-show-cart')
    
    //click checkout button
    cy.get('.checkout_button ').click()
    cy.screenshot('checkout-002-checkout')

    //fill checkout
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('90210')
    cy.screenshot('checkout-003-fill-checkout')
    cy.get('[data-test="continue"]').click()

    //check items
    cy.get('.cart_item_label').should('contain', 'Sauce Labs Backpack')
    cy.get('.cart_item_label').should('contain', 'Sauce Labs Bike Light')
    cy.get('.summary_subtotal_label').should('contain', 'Item total: $39.98')
    cy.screenshot('checkout-004-check-items')

    //complete purchase and check confirmation message
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    cy.screenshot('checkout-005-finish-purchase')
  })

})
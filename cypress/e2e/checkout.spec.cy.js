/// <reference types="cypress" />
import testdata from '../fixtures/testdata.json'

describe('example test inventory with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type(testdata['valid-username'])
    cy.get('#password').type(testdata['valid-password'])
    cy.get('#login-button').click()
  })

  it('Fill Checkout Form', ()=>{
    //inventory list
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('90210');
    cy.get('[data-test="continue"]').click();

  })

 it('Validate Order Summary', () => {
    //count inventory items
    cy.get('.cart_item_label').should('contain', 'Sauce Labs Backpack');
    cy.get('.cart_item_label').should('contain', 'Sauce Labs Bike Light');
    cy.get('.summary_subtotal_label').should('contain', 'Total: $42.00'); // Example value

  })
  
  it('Complete Purchase and Check Confirmation Message', () =>{
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  })

})
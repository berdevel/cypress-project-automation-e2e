/// <reference types="cypress" />
import testdata from '../fixtures/testdata.json'

describe('example test inventory with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type(testdata['valid-username'])
    cy.get('#password').type(testdata['valid-password'])
    cy.get('#login-button').click()
  })

  it('should inventory list exist', ()=>{
    //inventory list
    cy.get('.inventory_list').should('exist').screenshot()
  })

 it('count inventory items', () => {
    //count inventory items
    cy.get('.inventory_item').should('have.length', 6)
  })
  
  it('validate product names, price and buttons', () =>{
    //validate names and prices
    cy.get('.inventory_item').each(($el, index, $list) => {
    // Validate product names
    cy.wrap($el).find('.inventory_item_name').invoke('text').should('not.be.empty');

    // Validate product prices
    cy.wrap($el).find('.inventory_item_price').invoke('text').should('match', /^\$\d+\.\d{2}$/);

    // You can also assert against specific product details if you have them in an array
    // For example:
    // const expectedNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    // cy.wrap($el).find('.inventory_item_name').invoke('text').should('eq', expectedNames[index]);
    });

    //validate buttons
    cy.get('.btn_inventory').each(($el) => {
      // Assert that the button exists and is visible
      cy.wrap($el).should('be.visible');

      // Assert that the button has the correct text
      cy.wrap($el).should('have.text', 'Add to cart');
    });
  })

})
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
      const expectedNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)']
      cy.wrap($el).find('.inventory_item_name').invoke('text').should('not.be.empty').should('eq', expectedNames[index])

      // Validate product prices
      const expectedPrices = ['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99']
      cy.wrap($el).find('.inventory_item_price').invoke('text').should('match', /^\$\d+\.\d{2}$/).should('eq', expectedPrices[index])

      //validate buttons
      cy.wrap($el).find('.btn_inventory').should('be.visible').should('have.text', 'Add to cart')
      
    })
  })

})
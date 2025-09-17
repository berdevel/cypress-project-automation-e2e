/// <reference types="cypress" />
import testdata from '../fixtures/testdata.json'

describe('example test inventory with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type(testdata['valid-username'])
    cy.get('#password').type(testdata['valid-password'])
    cy.get('#login-button').click()
  })

  it('add products to cart', ()=>{
    //add two products to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  })

 it('verify cart badge count', () => {
    //verify cart badge count
    cy.get('.shopping_cart_badge').should('have.text', '2')
  })
  
  it('remove products from cart', () =>{
    //remove products from cart
    cy.get('.cart_list').contains('Sauce Labs Backpack').siblings('.item_info_container').find('.cart_button').click();
    cy.get('.cart_list').should('not.contain', 'Sauce Labs Backpack');
  })

})
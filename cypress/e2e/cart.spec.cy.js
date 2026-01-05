/// <reference types="cypress" />
import testdata from '../fixtures/testdata.json'

describe('example test add to cart with cypress v15.0.0 on saucedemo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type(testdata['valid-username'])
    cy.get('#password').type(testdata['valid-password'])
    cy.get('#login-button').click()
  })

  it('add, verify and remove products to cart', ()=>{
    //add two products to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.screenshot('cart-001-add-first-item')
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.screenshot('cart-002-add-second-item')

    //verify cart badge count
    cy.get('.shopping_cart_badge').should('have.text', '2').screenshot('cart-003-two-items-on-the-cart')

    //remove products from cart
    cy.get('.shopping_cart_link').click()
    cy.screenshot('cart-004-show-cart')
    cy.get('.cart_list').contains('Sauce Labs Backpack').siblings('.item_pricebar').find('.cart_button').click()
    cy.get('.cart_list').should('not.contain', 'Sauce Labs Backpack').screenshot('cart-005-delete-item')
  })
})
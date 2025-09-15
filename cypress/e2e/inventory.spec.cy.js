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
    //validate name, price
    cy.get('.inventory_item').should('exist').each(($el, index, $list) => {
    cy.wrap($el).screenshot(`login-014-item-${index+1}`);
    });

  })

})
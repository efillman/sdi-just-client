/// visits home page and comfirms url
describe('example to-do app', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/')
    })
    ///
    it('', () => {
      //
      cy.get('.todo-list li').should('have.length', 2)
      cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    })
})
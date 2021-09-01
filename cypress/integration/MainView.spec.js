/// visits home page and comfirms url
describe('Hime page testing', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/');
      cy.url().should('contains','http://localhost:3000/');
    })
    ///
    it('Verified Home Page Content', () => {
      //
      cy.get('[data-cy="homepage"]').invoke('text').should('equal','This is The Home Page')
    })
})

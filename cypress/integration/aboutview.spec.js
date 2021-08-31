/// visits home page and comfirms url
describe('home page testing', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/about');
      cy.url().should('contains','http://localhost:3000/about');
    })
    ///
    it('Verified Home Page Content', () => {
      //
      cy.get('[data-cy="aboutview"]').invoke('text').should('equal','This is the about view')
    })
})
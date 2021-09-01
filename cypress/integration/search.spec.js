/// visits home page and comfirms url
describe('search feature testing', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/');
      cy.url().should('contains','http://localhost:3000/');
    })
    ///
    it('Verified Home Page Content', () => {
      //
      cy.get('[data-cy="search-input"]').click( {force: true}).type('USAF');
    })
})
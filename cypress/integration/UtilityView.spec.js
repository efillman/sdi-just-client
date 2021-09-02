/// visits home page and comfirms url
describe('example to-do app', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/utility');
    })
  
  ///
  it('Verified Home Page Content', () => {
    //
    cy.get('[data-cy="utilityview"]').invoke('text').should('equal','This is the about view')
  })

})
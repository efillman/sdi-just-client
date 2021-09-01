/// visits home page and comfirms url
describe('example to-do app', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/');
    })
    ///
    it('Should click on the tracker in menu and verify the url and content of page', () => {
      //gets tracker 
      cy.get('[data-cy="sidebar-System Tracker"]').click( { multiple: true, force: true } );
      cy.url().should('equal','http://localhost:3000/tracker');
    })
})
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

      cy.get('[data-cy= "tracker-data-USA"]').contains('USA');
      cy.get('[data-cy= "tracker-data-USMC"]').contains('USMC');
      cy.get('[data-cy= "tracker-data-USN"]').contains('USN');
      cy.get('[data-cy= "tracker-data-USAF"]').contains('USAF');
      cy.get('[data-cy= "tracker-data-USSF"]').contains('USSF');
      cy.get('[data-cy= "tracker-data-DOD\\/Other"]').contains('DOD/Other');


    })
})
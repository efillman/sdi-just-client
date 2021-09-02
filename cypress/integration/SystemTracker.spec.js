/// visits Systems Tracker page and comfirms url
describe('System Tracker tests', () => {
    beforeEach(() => {

      //visits our app's home page
      cy.visit('http://localhost:3000/tracker');
    })
    ///
    it('Should click on the tracker in menu and verify the url and content of page', () => {

      //gets tracker and verifies correct url
      /*
      cy.get('[data-cy="sidebar-System Tracker"]').click( { multiple: true, force: true } );
      cy.url().should('equal','http://localhost:3000/tracker');
*/

      // verufues a column of systems exists for each respective service 
      cy.get('[data-cy= "tracker-data-USA"]').contains('USA');
      cy.get('[data-cy= "tracker-data-USMC"]').contains('USMC');
      cy.get('[data-cy= "tracker-data-USN"]').contains('USN');
      cy.get('[data-cy= "tracker-data-USAF"]').contains('USAF');
      cy.get('[data-cy= "tracker-data-USSF"]').contains('USSF');

      // DOD text will need to be updated to new name
      cy.get('[data-cy= "tracker-data-DOD\\/Other"]').contains('DOD/Other');


    })
})
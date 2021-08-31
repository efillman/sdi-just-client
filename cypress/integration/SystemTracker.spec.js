/// visits home page and comfirms url
describe('example to-do app', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/')
      cy.get('[data-cy="nav-link-System Tracker"]')
        .click( { multiple: true, force: true} )
      cy.url().should('equal','http://localhost:3000/tracker')
    })
    ///
    it('should visit the tracker page and confirm content', () => {
      //
      cy.get('[data-cy=tracker-data-USA]').should('contain', 'USA');
      cy.get('[data-cy=tracker-data-USMC]').should('contain', 'USMC');
      cy.get('[data-cy=tracker-data-USN]').should('contain', 'USN');
      cy.get('[data-cy=tracker-data-USAF]').should('contain', 'USAF');
      cy.get('[data-cy=tracker-data-USSF]').should('contain', 'USSF');
      cy.get('[data-cy=tracker-data-DOD\\/Other]').should('contain', 'DOD/Other');
    })
})
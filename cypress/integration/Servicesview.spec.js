/// visits home page and comfirms url
describe('Services page testing', () => {
    beforeEach(() => {
      //visits our app's home page
      cy.visit('http://localhost:3000/');
      cy.url().should('contains','http://localhost:3000/');
    })
    ///
    it('Verified Services Content', () => {
      //
      cy.get('[data-cy="sidebar-Services"]').click( { multiple: true, force: true } )
        .then(option => {
            // Confirm have correct option
            cy.wrap(option).contains('Services');  
    
            option[1].click();
       })
    })

    it('Searches for sytem in respective service page', () => {
        // visit army systems page and search for specific systems
        // and verifies search results
        cy.visit('http://localhost:3000/service/1');
         })
        cy.get('[data-cy=USA-search-systems]').click( {force: true}).type('TAIS');
        cy.get('[data-cy=USA-search-submit]').click( {force: true} )
})

    it('Searches for sytem in respective service page', () => {
        // visit army systems page and adds new system 
        // and verifies system was added
        cy.visit('http://localhost:3000/service/1');
    
        cy.get('[data-cy=USA-add-button]').click( {force: true})
    })

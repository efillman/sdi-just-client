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

    // USA Service page tests

    it('verifies sytem data in USA service page', () => {
      // visit army systems page and search for specific systems
      // and verifies search results
            cy.visit('http://localhost:3000/service/1');
            cy.get('[data-cy="USA-system-TAIS"]').invoke('text').should('contains','TAIS');
    })    

    it('Searches for sytem in USA service page', () => {
        // visit army systems page and search for specific systems
        // and verifies search results
        cy.visit('http://localhost:3000/service/1');
      
        cy.get('[data-cy=USA-system-search]').click( {force: true}).type('TAIS');
        cy.get('[data-cy=USA-search-submit]').click( {force: true} )
        ///cy.get('[data-cy=result-system-button]').click( {force: true} )
    })

    // USMC Service view testing 
    it('verifies sytem data in USMC service page', () => {
      // visit army systems page and search for specific systems
      // and verifies search results
            cy.visit('http://localhost:3000/service/2');
            cy.get('[data-cy="USMC-system-TAIS"]').invoke('text').should('contains','TAIS');
    })    

    it('Searches for sytem in USMC service page', () => {
        // visit army systems page and search for specific systems
        // and verifies search results
        cy.visit('http://localhost:3000/service/2');
      
        cy.get('[data-cy=USMC-system-search]').click( {force: true}).type('TAIS');
        cy.get('[data-cy=USMC-search-submit]').click( {force: true} )
        ///cy.get('[data-cy=result-system-button]').click( {force: true} )
    })

        // USN Service view testing 
        it('verifies sytem data in USN service page', () => {
          // visit army systems page and search for specific systems
          // and verifies search results
                cy.visit('http://localhost:3000/service/3');
                cy.get('[data-cy="USN-system-TAIS"]').invoke('text').should('contains','TAIS');
        })    
    
        it('Searches for sytem in USN service page', () => {
            // visit USN systems page and search for specific systems
            // and verifies search results
            cy.visit('http://localhost:3000/service/3');
          
            cy.get('[data-cy=USN-system-search]').click( {force: true}).type('TAIS');
            cy.get('[data-cy=USN-search-submit]').click( {force: true} )
            ///cy.get('[data-cy=result-system-button]').click( {force: true} )
        })
    
        //USAF Service View Testing
        it('verifies sytem data in USAF service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
                cy.visit('http://localhost:3000/service/4');
                cy.get('[data-cy="USAF-system-TAIS"]').invoke('text').should('contains','TAIS');
        })    

        it('verifies sytem data in USAF service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
          cy.visit('http://localhost:3000/service/4');
          cy.get('[data-cy=USAF-system-search]').click( {force: true}).type('TAIS');
          cy.get('[data-cy=USAF-search-submit]').click( {force: true} );
    
          })

                  //USSF Service View Testing
        it('verifies sytem data in USSF service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
                cy.visit('http://localhost:3000/service/5');
                cy.get('[data-cy="USSF-system-TAIS"]').invoke('text').should('contains','TAIS');
        })    

        it('verifies sytem data in USSF service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
          cy.visit('http://localhost:3000/service/5');
          cy.get('[data-cy=USSF-system-search]').click( {force: true}).type('TAIS');
          cy.get('[data-cy=USSF-search-submit]').click( {force: true} );
    
          })

        //USSF Service View Testing
        it('verifies sytem data in USSF service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
                cy.visit('http://localhost:3000/service/5');
                cy.get('[data-cy="USSF-system-TAIS"]').invoke('text').should('contains','TAIS');
        })    

        it('verifies sytem data in USSF service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
          cy.visit('http://localhost:3000/service/5');
          cy.get('[data-cy=USSF-system-search]').click( {force: true}).type('TAIS');
          cy.get('[data-cy=USSF-search-submit]').click( {force: true} );
    
          })

         //US DOD/Other testing
        it('verifies sytem data in DOD\\/Other service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
                cy.visit('http://localhost:3000/service/6');
                cy.get('[data-cy="DOD\\/Other-system-TAIS"]').invoke('text').should('contains','TAIS');
        })    

        it('verifies sytem data in DOD\\/Other service page', () => {
          // visit USAF systems page and search for specific systems
          // and verifies search results
          cy.visit('http://localhost:3000/service/6');
          cy.get('[data-cy=DOD\\/Other-system-search]').click( {force: true}).type('TAIS');
          cy.get('[data-cy=DOD\\/Other-search-submit]').click( {force: true} );
    
          })

})

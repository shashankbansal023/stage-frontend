describe('Instagram Stories', () => {
    beforeEach(() => {
      cy.intercept('GET', '/stories.json', {
        fixture: 'stories.json',
      }).as('getStories');
      cy.visit('/');
    });
  
    it('should display stories list', () => {
      cy.get('[data-testid="story-thumbnail"]').should('have.length', 3);
    });
  
    it('should open story viewer when clicking a thumbnail', () => {
      cy.get('[data-testid="story-thumbnail"]').first().click();
      cy.get('[data-testid="story-viewer"]').should('exist');
    });
  
    it('should show loading spinner while image loads', () => {
      cy.get('[data-testid="story-thumbnail"]').first().click();
      cy.get('[data-testid="loading-spinner"]').should('exist');
    });
  
    it('should auto-advance after 5 seconds', () => {
      cy.click();
      cy.get('[data-testid="story-thumbnail"]').first().click();
      cy.tick(5000);
      cy.get('[data-testid="story-image"]').should('have.attr', 'src', 'https://picsum.photos/300/500?2');
    });
  
    it('should navigate next when clicking right side', () => {
      cy.get('[data-testid="story-thumbnail"]').first().click();
      cy.get('[data-testid="story-viewer"]').click('right');
      cy.get('[data-testid="story-image"]').should('have.attr', 'src', 'https://picsum.photos/300/500?2');
    });
  
    it('should navigate previous when clicking left side', () => {
      cy.get('[data-testid="story-thumbnail"]').eq(1).click();
      cy.get('[data-testid="story-viewer"]').click('left');
      cy.get('[data-testid="story-image"]').should('have.attr', 'src', 'https://picsum.photos/300/500?1');
    });
  
    it('should close viewer when reaching end of stories', () => {
      cy.clock();
      cy.get('[data-testid="story-thumbnail"]').last().click();
      cy.tick(5000);
      cy.get('[data-testid="story-viewer"]').should('not.exist');
    });
  });
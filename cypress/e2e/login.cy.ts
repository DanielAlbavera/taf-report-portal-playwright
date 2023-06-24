describe('Login Validations', () => {
  it('should NOT login with invalid credentials', () => {
    cy.visit('/');

    const usernameInput = cy.get('input[name="login"]');
    const passwordInput = cy.get('[name="password"]');
    const submitButton = cy.get('[type="submit"]');
    const gitHubButton = cy.get('a[href="https://github.com/reportportal"]');


    const dataTransfer = new DataTransfer();

    gitHubButton.scrollIntoView().should('be.visible').trigger('dragstart', {
      dataTransfer
    });
    usernameInput.scrollIntoView().should('be.visible').trigger('drop', {
      dataTransfer
    });
    usernameInput.scrollIntoView().should('be.visible').type('invalid_username');
    passwordInput.scrollIntoView().should('be.visible').type('invalid_password');
    submitButton.scrollIntoView().should('be.visible').click();
    cy.get('.notification-transition-enter-done p').should('contain', 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials');
    cy.screenshot();
  });
});
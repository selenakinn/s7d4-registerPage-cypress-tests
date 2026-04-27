import { errorMessages } from "../../src/components/Register";
describe('Register Page', () => {
  describe('Error Messages', () => {
    it('name input throws error for 2 chars', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="ad-input"]').type('em');
      cy.conttains(errorMessages.ad);
    })
    it('Surname input throws error for 2 chars', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="soyad-input"]').type('şa');
      cy.conttains(errorMessages.soyad);
    })
    it('Email input throws error for invalid emre@wit', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="email-input"]').type('invalid-email');
      cy.conttains(errorMessages.email);
    })
    it('Password input throws error for 1234', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="password-input"]').type('invalid-password');
      cy.conttains(errorMessages.password);
    })
    it('Button is disabled for unvalidated inputs', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="password-input"]').type('invalid-password');
      cy.get('[data-cy="password-input"]').should('be.disabled');
    })
  });
  describe('Form inputs validated', () => {
    it('button enabled for validated inputs', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="ad-input"]').type('Emre');
      cy.get('[data-cy="soyad-input"]').type('Şahiner');
      cy.get('[data-cy="email-input"]').type('emre@wit.com');
      cy.get('[data-cy="password-input"]').type('ValidPassword123*');
      cy.get('[data-cy="submit-button"]').should('not be.disabled');
    })
    it('submits form on validated inputs', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="ad-input"]').type('Emre');
      cy.get('[data-cy="soyad-input"]').type('Şahiner');
      cy.get('[data-cy="email-input"]').type('emre@wit.com');
      cy.get('[data-cy="password-input"]').type('ValidPassword123*');
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="response-message"]').should('be visible');
    })
  });
});

import { getGreeting } from '../support/app.po';

describe('japanese', () => {
    beforeEach(() => cy.visit('/'));

    it('should display welcome message', () => {
        // Custom command example, see `../support/commands.ts` file
        cy.login();

        // Function helper example, see `../support/app.po.ts` file
        getGreeting().contains('Welcome to Your Vue.js + TypeScript App');
    });
});
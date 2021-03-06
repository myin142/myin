import {
    getRadicalTable,
    radicalEditButton,
    radicalTagEditInput,
    radicalSaveButton,
    radicalCancelButton,
} from '../support/radicals.po';

describe('Radicals', () => {
    beforeEach(() => {
        cy.login();
        cy.server();
        cy.route('GET', '/radical?**', 'fixture:radicals.json');
        cy.visit('/radicals');
    });

    it('show radicals with tags', () => {
        getRadicalTable()
            .find('tbody tr:first')
            .should('contain', '亅')
            .and('contain', 'hook')
            .next()
            .should('contain', '二')
            .and('contain', 'two')
            .next()
            .should('contain', '亠')
            .and('contain', 'lid')
            .next()
            .should('contain', '氏')
            .and('contain', 'clan')
            .next()
            .should('contain', '气')
            .and('contain', 'air, steam')
            .next()
            .should('contain', '水')
            .and('contain', 'water');
    });

    it('edit radical tags', () => {
        getRadicalTable().find(`tbody tr:nth(1)`).as('radical');

        cy.route('POST', '/radical', {});

        // Edit with buttons
        cy.get('@radical').find(radicalEditButton).click();
        cy.get('@radical')
            .find(radicalTagEditInput)
            .should('have.value', 'two')
            .clear()
            .type('new tag');
        cy.get('@radical').find(radicalSaveButton).click();
        cy.get('@radical').should('contain', '二').and('contain', 'new tag');

        // Edit with enter
        cy.get('@radical').find(radicalEditButton).click();
        cy.get('@radical').find(radicalTagEditInput).clear().type('edit with enter{enter}');
        cy.get('@radical').and('contain', 'edit with enter');

        // Cancel Edit
        cy.get('@radical').find(radicalEditButton).click();
        cy.get('@radical').find(radicalTagEditInput).type('changed');
        cy.get('@radical').find(radicalCancelButton).click();
        cy.get('@radical').should('not.contain', 'changed');
    });
});

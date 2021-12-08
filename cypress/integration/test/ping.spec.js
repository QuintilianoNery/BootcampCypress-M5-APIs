/// <reference types="cypress" />

const { method } = require("bluebird");

context('Ping', () => {
    it('GET Healthcheck', () => {
        //GET http://treinamento-api.herokuapp.com/ping
        //Validação Healthcheck para status 201 da API
        cy.request({
            method: 'GET',
            url: 'ping'
        }).its('status').should('eq', 201)
    });
});
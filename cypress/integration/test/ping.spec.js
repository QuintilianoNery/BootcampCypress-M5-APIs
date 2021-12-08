/// <reference types="cypress" />

import req from '../../support/api/requests'

context('Ping', () => {
    it('GET Healthcheck', () => {
        //GET http://treinamento-api.herokuapp.com/ping
        //Validação Healthcheck para status 201 da API
        //request
        req.getPing()
        //assertions
        .its('status').should('eq', 201)
    });
});
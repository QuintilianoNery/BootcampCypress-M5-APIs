/// <reference types="cypress" />

import req from '../../support/api/requests'
import assertiosn from '../../support/api/assertions'

context('Ping', () => {
    it('GET Healthcheck', () => {
        //GET http://treinamento-api.herokuapp.com/ping
        //Validação Healthcheck para status 201 da API
        //request
        req.getPing()
            //assertions
            .then(getPingResponse => {
                assertiosn.shouldHaveStatus(getPingResponse, 201)
            })
    });
});
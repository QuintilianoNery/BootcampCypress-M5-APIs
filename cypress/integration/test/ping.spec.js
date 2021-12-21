/// <reference types="cypress" />

import req from '../../support/api/requests'
import assertiosn from '../../support/api/assertions'

//Validação do healthcheck
context('Ping', () => {
    it('Validar que a aplicação está Online', () => {
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
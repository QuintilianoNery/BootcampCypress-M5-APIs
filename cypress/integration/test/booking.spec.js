/// <reference types="cypress" />

import spok from 'cy-spok'

context('Booking', () => {
    it('validar contrato do GET Booking', () => {
        //Validando retorno do GET Booking
        cy.request({
            //tipo de requisição GET
            method: 'GET',
            //url da requisição
            url: 'booking/1'
            //getBookingResponse é um objeto de resposta, que retorna os valores da requisição
        }).then(getBookingResponse => {
            
            cy.log(getBookingResponse.status)
            //Extrair o conteúdo do(body) retorno GET
            cy.wrap(getBookingResponse.body)
                .should(
                    //Objeto Spok validando o contrato do retorno com as especificações do contrato
                    spok({
                        firstname: spok.string,
                        lastname: spok.string,
                        totalprice: spok.number,
                        depositpaid: spok.type('boolean'),
                        bookingdates: {
                            checkin: spok.string,
                            checkout: spok.string
                        },
                    })
                )
        })
    });
});
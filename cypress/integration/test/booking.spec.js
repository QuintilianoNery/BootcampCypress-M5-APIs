/// <reference types="cypress" />

import spok from 'cy-spok'
import req from '../../support/api/requests'
import schemas from '../../support/api/schemas'
import assertions from '../../support/api/assertions'


//Validação do healthcheck
//Validação do contrato do endpoint (bory)
//Validação do contrato do endpoint (headers)
context('Validação do endpoint - Com abstração de dados', () => {
    it('validar contrato do GET Booking', () => {

        req.getBooking()
            .then(getBookingResponse => {

                cy.log(getBookingResponse.status)
                assertions
                    .validateContractOf(
                        getBookingResponse, schemas.getBookingSchema())
            })
    });

    it('POST - Criar uma reserva com sucesso', () => {
        req.postBooking()
            .then(postBookingResponse => {
                assertions.shouldHaveStatus(postBookingResponse, 200)
                assertions.shouldbookingIdCreatedTrue(postBookingResponse)
                assertions.shouldHaveDefaultHeader(postBookingResponse)
                assertions.shouldHaveContentTypeApp(postBookingResponse)
                assertions.shouldDurationBeFast(postBookingResponse)
            })
    })

    //alterar uma reserva sem token => 403
    //alterar uma reserva com token inválido => 403
    //Alterar uma reserva com token válido => 200

    it('Tentar alterar uma reserva sem token', () => {
        cy.request({
            method: 'PUT',
            url: 'booking/?',
            bory: {
                "firstname": "qtq",
                "lastname": "defanini",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                }
            }
        });
    });
});


//----------------------------------------------------------------------------------------------------------------------

context('Validação do endpoint - Sem Abstração de dados', () => {
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
                        }
                    })
                )
        })
    });

    it('POST - Criar uma reserva com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'booking',
            body:
            {
                "firstname": "Quin",
                "lastname": "defanini",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
            }
        }).then(postBookingResponse => {
            //Validando que o registro goi inserido com sucesso
            expect(postBookingResponse.status).to.eq(200)
            expect(postBookingResponse.body.bookingid, 'O id da reserva não pode ser nulo').to.not.be.null;
            cy.log(postBookingResponse.body.bookingid, 'Log da resposta')
            expect(postBookingResponse.body.bookingid, 'O id da reserva não pode ser 0').to.not.be.eq(0);
            //validando o header da resposta
            expect(postBookingResponse.headers, 'Validando os valores do headers').to.include({
                server: 'Cowboy',
                connection: 'keep-alive',
                via: '1.1 vegur',
                'x-powered-by': 'Express'
            })
            expect(postBookingResponse.headers, 'Validando o tipo do arquivo').to.include({
                'content-type': 'application/json; charset=utf-8'
            })
            //validar tempo para execução da requisição
            expect(postBookingResponse.duration, 'A resposta deve ser menor que 900ms').to.be.lessThan(900);
        })
    })
});
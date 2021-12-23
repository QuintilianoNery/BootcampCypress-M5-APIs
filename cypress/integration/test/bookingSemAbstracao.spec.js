/// <reference types="cypress" />

import spok from 'cy-spok'
import req from '../../support/api/requests'
import assertions from '../../support/api/assertions'

const Leite = require('leite')
const leite = new Leite()

const nome = leite.pessoa.nome()
const sobrenome = leite.pessoa.sobrenome()

//Validação do healthcheck
//Validação do contrato do endpoint (bory)
//Validação do contrato do endpoint (headers)

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
                "firstname": `${nome}`,
                "lastname": `${sobrenome}`,
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
    it('Tentar alterar uma reserva sem token', () => {
        req.postBooking().then(postBookingResponse => {
            const id = postBookingResponse.body.bookingid;

            cy.request({
                method: 'PUT',
                url: `booking/${id}`,
                bory: {
                    "firstname": `${nome}`,
                    "lastname": `${sobrenome}`,	
                    "totalprice": 111,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2020-01-01",
                        "checkout": "2020-01-02"
                    }
                },
                failOnStatusCode: false
            }).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveDefaultHeader(putBookingResponse)
                assertions.shouldHaveContentTypeText(putBookingResponse)
            })
        })
    });

    it('Teste com body.token ', () => {
        cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        }).then(authResponse => {
            const token = authResponse.body.token;
            Cypress.env('token', token);
            cy.log(token)

        })
    });

});
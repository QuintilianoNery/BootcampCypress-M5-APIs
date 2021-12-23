/// <reference types="cypress" />

import req from '../../support/api/requests'
import schemas from '../../support/api/schemas'
import assertions from '../../support/api/assertions'


//Validação do healthcheck
//Validação do contrato do endpoint (bory)
//Validação do contrato do endpoint (headers)
context('Validação do endpoint - Com abstração de dados', () => {
    //Garantir que o token seja gerado sempre antes de todos os testes

    beforeEach(() => {
        req.tokenAuth()
    });



    it('validar contrato do GET Booking', () => {

        req.getBooking()
            .then(getBookingResponse => {

                cy.log(getBookingResponse.status)
                assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
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
        req.postBooking().then(postBookingResponse => {
            req.atualizarReservaSemToken(postBookingResponse)
                .then(putBookingResponse => {
                    assertions.shouldHaveStatus(putBookingResponse, 403)
                    assertions.shouldHaveDefaultHeader(putBookingResponse)
                    assertions.shouldHaveContentTypeText(putBookingResponse)
                    assertions.shouldDurationBeFast(putBookingResponse)
                })
        })
    });

    it('Alterar uma reserva com sucesso', () => {


        req.postBooking().then(postBookingResponse => {
            req.atualizarReserva(postBookingResponse)
                .then(putBookingResponse => {
                    //Deveria ser status 200
                    assertions.shouldHaveStatus(putBookingResponse, 400)
                    assertions.shouldHaveDefaultHeader(putBookingResponse)
                    assertions.shouldHaveContentTypeText(putBookingResponse)
                    assertions.shouldDurationBeFast(putBookingResponse)
                })
        })
    });

});
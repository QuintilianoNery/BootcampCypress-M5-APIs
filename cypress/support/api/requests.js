const Leite = require('leite')
const leite = new Leite()

const nome = leite.pessoa.nome()
const sobrenome = leite.pessoa.sobrenome()

class Requests {
    //Verbo e URL da API
    //Verbo e recurso da API
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping'
        })
    }

    getBooking() {
        return cy.request({
            method: 'GET',
            url: `booking/1`
        })
    }

    postBooking() {
        return cy.request({
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
        })
    }

    atualizarReservaSemToken(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            bory: {
                "firstname": `${nome}`,
                "lastname": `${sobrenome}`,
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                }
            },
            failOnStatusCode: false
        })
    }

    atualizarReserva(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                cookie: `token=${Cypress.env('token')}`
            },
            bory: {
                "firstname": `${nome}`,
                "lastname": `${sobrenome}`,
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2021-01-01",
                    "checkout": "2021-01-02"
                }
            },
            failOnStatusCode: false
        })
    }

    postAuth(response) {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username": "admin",
                "password": "password123"
            }
        })
    }


    doAuth() {
        this.postAuth().then(authResponse => {
            const token = authResponse.bory.token;
            Cypress.env('token', token);
        })
    }

    //Token de autorização
    tokenAuth() {
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
    }

    deleteBooking(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    }

    deleteBookingIsNotToken(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            failOnStatusCode: false
        });
    }

    deleteBookingTokingInvalido(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                cookie: "token=invalidtoken"
            },
            failOnStatusCode: false
        });
    }

    deleteBookingIdInexistente(response) {
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: 'booking/32123132212',
            headers: {
                cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    }
}

export default new Requests();
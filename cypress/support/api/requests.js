const Leite = require('leite')
const leite = new Leite()

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
        })
    }

    atualizarReservaSemToken(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            bory: {
                "firstname": leite.pessoa.nome(),
                "lastname": leite.pessoa.sobrenome(),
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                }
            },
            failOnStatusCode: false
        })
    }

    atualizarReserva(response) {
        const id = response.body.bookingid;

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                cookie: `$token=${Cypress.env('token')}`
            },
            bory: {
                "firstname": leite.pessoa.nome(),
                "lastname": leite.pessoa.sobrenome(),
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-01-01",
                    "checkout": "2020-01-02"
                }
            },
            failOnStatusCode: false
        })
    }

    postAuth() {
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
}

export default new Requests();
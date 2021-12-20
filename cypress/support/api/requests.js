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
}

export default new Requests();
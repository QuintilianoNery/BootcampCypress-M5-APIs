class Assertions {
    shouldHaveStatus(response, status) {
        expect(response.status, `status is ${status}`).to.equal(status)

    }

    validateContractOf(response, schema) {
        return cy.wrap(response.body).should(
            schema
        )
    }

    shouldbookingIdCreatedTrue(response) {
        expect(response.body.bookingid, 'O idnão pode ser nulo').to.not.be.null;
        expect(response.body.bookingid, 'O idnão pode ser 0').to.not.be.eq(0)
        cy.log(response.body.bookingid, 'Log da resposta')

    }

    shouldHaveDefaultHeader(response) {
        expect(response.headers, 'Validando os valores do headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            via: '1.1 vegur',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentTypeApp(response) {
        expect(response.headers, 'Tipo arquivo application/json').to.include({
            'content-type': 'application/json; charset=utf-8'

        })
    }

    shouldHaveContentTypeText(response) {
        expect(response.headers, 'Tipo arquivo text/json').to.include({
            'content-type': 'text/plain; charset=utf-8'
        })
    }

    shouldDurationBeFast(response) {
        expect(response.duration, 'A resposta deve ser menor que 900ms').to.be.lessThan(900);
    }

}

export default new Assertions();


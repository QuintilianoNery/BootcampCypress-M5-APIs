class Assertions {
    shouldHaveStatus(response, status) {
        expect(response.status).to.equal(status)
        
    }

    validateContractOf(response, schema) {
        return cy.wrap(response.body).should(
            schema
        )
    }
}

export default new Assertions();


class Requests {
    //Verbo e URL da API
    //Verbo e recurso da API
    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping'
        });
    };
};

export default new Requests();
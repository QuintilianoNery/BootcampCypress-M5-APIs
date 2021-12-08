class Assertions {
shouldHaveStatus(response,status){
    expect(response.status).to.equal(status)
}
}

export default new Assertions();
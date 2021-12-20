import spok from 'cy-spok'

class Schemas {
    getBookingSchema() {
        return spok({
            firstname: spok.string,
            lastname: spok.string,
            totalprice: spok.number,
            depositpaid: spok.type('boolean'),
            bookingdates: {
                checkin: spok.string,
                checkout: spok.string
            }
        })
    }
}

export default new Schemas();
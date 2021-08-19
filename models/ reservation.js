const mongoose= require('mongoose')

const reservationSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: [true, 'Missing field: customerId']
    },
    carId: {
        type: String,
        required: [true, 'Missing field: carId']
    }
})
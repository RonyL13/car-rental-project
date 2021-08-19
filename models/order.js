const mongoose= require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: [true, 'Missing field: customerId']
    },
    car: {
        type: String,
        required: [true, 'Missing field: carId']
    },
    from: {
        type: Date
    },
    to: {
        type: Date,
    },
    days: {
        type: Number,
        required: [true, 'Missing field: days']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Missing field: Total Price']
    }
})


module.exports.Order = mongoose.model('Order', orderSchema);

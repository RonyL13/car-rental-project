const mongoose = require('mongoose')

const carsSchema = new mongoose.Schema({
   manufacturer: {
      type: String,
      required: [true, 'Missing field: Manufacturer'],
   },
   model: {
      type: String,
      required: [true, 'Missing field: Model']
   },
   year: {
      type: Number,
      min: 1920,
      max: new Date().getFullYear(),
      required: [true, 'Missing field: Year']
   },
   plate: {
      type: String,
      required: [true, 'Missing field: Plate'],
      unique: true,
   },
   color: {
      type: String,
      required: [true, 'Missing field: Color']
   },
   transmission: {
      type: String,
      required: [true, 'Missing field: Transmission']
   },
   image: {
      type: String,
      required: [true, 'Missing field: image(source)']
   },
   seats: {
      type: Number,
      required: [true, 'Missing field: Seats']
   },
   price: {
      type: Number,
      required: [true, 'Missing field: Price']
   },
   bookings: {
      type: Array,
      required: [true, 'Missing field: booking'],
      default: [],
   },
   timesBooked: {
      type: Number,
      required: true,
      default: 0
   }


});

module.exports.Car = mongoose.model('Car', carsSchema);


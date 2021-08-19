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
      max: 2021,
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
   booking: {
      type: Object,
      required: [true, 'Missing field: booking'],
      default: {
         isBooked: false,
         by: null
      },
      isBooked: {
         type: Boolean,
         required: [true, 'Missing field: isBooked'],
         default: false
      },
      by: {
         type: String,
         required: [true, 'Missing field: (isBooked) by'],
         default: null
      }
   }


});

 module.exports.Car = mongoose.model('Car', carsSchema);


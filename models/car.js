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
   price: {
      type: Number,
      required: [true, 'Missing field: Price']
   },
   bookings: {
      type: Array,
      required: [true, 'Missing field: booking'],
      default: [],
      // by: {
      //    type: String,
      //    required: [true, 'Missing field: (isBooked) by'],
      //    default: null
      // }
      // from: {
      //    type: Date,
      //    required: ['true', 'missing field: from date'],
      //    min: function () {
      //       let today = new Date();
      //       let dd = String(today.getDate()).padStart(2, '0');
      //       let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      //       let yyyy = today.getFullYear();

      //       today = yyyy + '-' + mm + '-' + dd;
      //       return today;
      //    },
      //    max: function () {

      //       let twoMonthsFromToday = new Date();
      //       let dd = String(twoMonthsFromToday.getDate()).padStart(2, '0');
      //       let mm = String(twoMonthsFromToday.getMonth() + 3).padStart(2, '0'); //January is 0!
      //       let yyyy = twoMonthsFromToday.getFullYear();

      //       twoMonthsFromToday = yyyy + '-' + mm + '-' + dd;
      //       return twoMonthsFromToday;
      //    }
      // },
      // to: {
      //    type: Date,
      //    required: [true, 'Missing field: to date']
      // }
   },
   timesBooked: {
      type: Number,
      required: true,
      default: 0
   }


});

module.exports.Car = mongoose.model('Car', carsSchema);


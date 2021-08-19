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
   image: {
      type: String,
      required: [true, 'Missing field: image(source)']
   }


});

 module.exports.Car = mongoose.model('Car', carsSchema);
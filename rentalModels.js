const mongoose = require('mongoose');

var url = `mongodb+srv://admin:12345@cluster0.0cco4.mongodb.net/customers-database?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected successfully to MongoDB!'))
 .catch(err => console.error('Something went wrong', err));

// The blueprint for customer collection documents
 const customersSchema = new mongoose.Schema({
     name: {
         type: String,
         required: [true, 'Missing field: Name']
     },
     password: {
      type: String,
      required: [true, 'Missing field: Password']
     },
     email: {
        type: String,
        required: [true, 'Missing field: Email Address']
     },
     phone: {
        type: Number,
        required: [true, 'Missing field: Phone Number']
     },
     dl: {
        type: String,
        required: [true, "Missing field: Driver's License"]
     },
     gender: String
});


const carsSchema = new mongoose.Schema({
   manufacturer: {
       type: String,
       required: [true, 'Missing field: Manufacturer']
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
   // plate: {
   //    type: Number,
   //    required: [true, 'Missing field: Plate']
   // }


});

 module.exports.Customer = mongoose.model('Customer', customersSchema);
 module.exports.Car = mongoose.model('Car', carsSchema);
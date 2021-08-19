const mongoose = require('mongoose');

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
        required: [true, 'Missing field: Email Address'],
        unique: true,
        lowercase: true
     },
     phone: {
        type: String,
        required: [true, 'Missing field: Phone Number'],
        unique: true
     },
     dl: {
        type: String,
        required: [true, "Missing field: Driver's License"],
        unique: true
     },
     gender: String
});


module.exports.Customer = mongoose.model('Customer', customersSchema);

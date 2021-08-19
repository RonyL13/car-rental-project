const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// The blueprint for customer collection documents
 const customersSchema = new mongoose.Schema({
     name: {
         type: String,
         required: [true, 'Missing field: Name']
     },
     password: {
      type: String,
      required: [true, 'Missing field: Password'],
      minlength: [6, 'Password cannot be shorter than 6 characters'],
      maxlength: [20, 'Password cannot exceed 12 characters']
     },
     email: {
        type: String,
        required: [true, 'Missing field: Email Address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter a valid email']
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
     gender: String,

     admin: {
        type: Boolean,
        required: [true, 'Missing field: Admin'],
        default: false
     }
});

// Using mongoose hooks and bcrypt to hash passwords
customersSchema.pre('save', async function (next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
}) 

customersSchema.statics.login = async function(loginInfo) {
   const customer = await this.findOne({email: loginInfo.email});
   if (customer) {
      const auth = await bcrypt.compare(loginInfo.password, customer.password)
      if (auth) {
         return customer;
      }
      throw Error ('Incorrect Email or Password')
   }
   throw Error('Incorrect Email or Password')
}


module.exports.Customer = mongoose.model('Customer', customersSchema);

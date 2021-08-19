const jwt = require('jsonwebtoken');
const customerModel = require('../models/customer')

const Customer = customerModel.Customer;

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;


    // Check if json web token exists and is verified
    if (token) {
        jwt.verify(token, 'rental project secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

// Check current user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'rental project secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.customer = null;
                next();
            } else {
                console.log(decodedToken);
                let customer =  await Customer.findById(decodedToken.id)
                res.locals.customer = customer;
                next();
            }
        })
    } else {
        res.locals.customer = null;
        next();
    }
}
module.exports = { authenticate, checkUser };
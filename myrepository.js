const customerModel = require('./models/customer')
const carModel = require('./models/car')
const jwt = require('jsonwebtoken')

const Customer = customerModel.Customer
const Car = carModel.Car


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'rental project secret', {
        expiresIn: maxAge
    })
}

module.exports = {

    // This function handles new customer registration
    async createCustomer(customerInfo) {
        try {
            const newCustomer = new Customer(customerInfo);
            const token = createToken(newCustomer._id)
            const x = await newCustomer.save();
            return { status: true,
                     token: token };
        }

        catch(err) {
            console.log(err);
            return {
                status: false,
                errorData: err.keyValue
            };
        }
     
    },

    // This function adds a new car to database
    async createCar(carInfo) {
        const newCar = new Car(carInfo);
        const x = await newCar.save();
        return (`registered new car with id ${x._id}`);
    },

    // This function returns all cars in database
    // async getAllCars() {
    //    const allCars =  await Car.find({})
    //     return allCars;
    // },



    // This function returns the results based on the user's search parameters on the landing page search form
    async getCarByFilters(info) {
        const results = await Car.find(info.params)
            return results;
    },

    // This function handles the login process 
    async customerLogin(loginInfo) {
        try {
            const customer = await Customer.login(loginInfo);
            const token = createToken(customer._id)
            return {customer: customer._id,
                    token: token
                }
        }
        catch(err) {
            console.log(`An error occured while attempting to login: ${err}`);
            return err;
        }
    },

    async bookCar(info, customerToken) {
       try {
        // Find the requested car in the database
        const carResult = await Car.findById(info.id);
        // Check if car is available at given dates
        for (let i = 0; i < carResult['bookings'].length; i++) {
            if (info['from'] <= carResult['bookings'][i]['to'] && carResult['bookings'][i]['from'] <= info['to']) {
                return {msg: 'This car is unavailable'};
            } else {
                // Grab and store the customer database ID
                let customerId = jwt.verify(customerToken, 'rental project secret', (err, decodedToken) => {
                    return decodedToken.id; 
                })
                carResult['bookings'].push({
                    by: customerId,
                    from: info['from'],
                    to: info['to']
                })

                const x = await carResult.save();
                return x;
            }
        }



        // if((info['from'] <= carResult['bookings']['to']) && (carResult['bookings']['from'] <= info['to'])) {
        //     return {msg: 'This car is unavailable'}
        // } else {
        //     // Grab the customer database ID and store it in a variable
        //     let customerId = jwt.verify(customerToken, 'rental project secret', (err, decodedToken) => {
        //         return decodedToken.id; 
        //     })
        //     // Change the booking object to reflect the new booking
        //     carResult['bookings'] = {
        //         isBooked: true,
        //         by: customerId,
        //         from: info['from'],
        //         to: info['to']
        //     }

        //     const x = await carResult.save();
        //     return x;
        // }
    }
    catch(err) {
        console.log('this is err: ' + err);
    }
    }
}


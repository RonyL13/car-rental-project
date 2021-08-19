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
    async getCarByFilters(params) {
        const results = await Car.find(params)
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

    async bookCar(carId, customerToken) {
       
        // Grab the customer database ID and store it in a variable
        let customerId = jwt.verify(customerToken, 'rental project secret', (err, decodedToken) => {
            return decodedToken.id; 
        })
        const carResult = await Car.findById(carId.id);

        carResult['booking'] = {
            isBooked: true,
            by: customerId
        }

        const x = await carResult.save();

        console.log(x);
        return x;
    }
}


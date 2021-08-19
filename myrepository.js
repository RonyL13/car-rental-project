const customerModel = require('./models/customer')
const carModel = require('./models/car')


const Customer = customerModel.Customer
const Car = carModel.Car

module.exports = {
    // This function handles new customer registration
    async createCustomer(customerInfo) {
        try {
            const newCustomer = new Customer(customerInfo);
       
            const x = await newCustomer.save();
            return true;
        }

        catch(err) {
            console.log(typeof err)
            console.log("this is error: " + err);
            return {
                status: false,
                errorData: err.keyValue
            };
        }
     
    },

    // This function adds a new car to database
    async createCar(carInfo) {
        const newCar = new Car(carInfo);
       // console.log(newCar);
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
        console.log(params);
        const results = await Car.find(params)
            return results;
    }
}
const rentalModels = require('./rentalModels')

const Customer = rentalModels.Customer
const Car = rentalModels.Car

module.exports = {
    // This function handles new customer registration
    async addNewCustomer(customerInfo) {
        const newCustomer = new Customer(customerInfo);
       
        const x = await newCustomer.save();
        return (`registered new customer with id ${x._id}`);
    },

    async addNewCar(carInfo) {
        console.log('inside repository function');
        const newCar = new Car(carInfo);

        const x = await newCar.save();
        return (`registered new car with id ${x._id}`);
    }
}
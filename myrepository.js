const customerModel = require('./models/customer')
const carModel = require('./models/car')
const orderModel = require('./models/order')
const jwt = require('jsonwebtoken')

const Customer = customerModel.Customer
const Car = carModel.Car
const Order = orderModel.Order


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
            return {
                status: true,
                token: token
            };
        }

        catch (err) {
            console.log({ err });
            // return {
            //     status: false,
            //     errorData: err.keyValue
            // };
            return { err }
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
            return {
                customer: customer._id,
                token: token
            }
        }
        catch (err) {
            console.log(`An error occured while attempting to login: ${err}`);
            return err;
        }
    },

    async bookCar(info, customerToken) {
        try {
            // Find the requested car in the database
            const carResult = await Car.findById(info.id);
            // Check if car is available at given dates

            if (carResult['bookings'].find(current => info['from'] <= current['to'] && current['from'] <= info['to'])) {
                return { msg: 'This car is unavailable' };
            } else {
                // Grab and store the customer database ID
                let customerId = jwt.verify(customerToken, 'rental project secret', (err, decodedToken) => {
                    return decodedToken.id;
                })
                // Update the bookings field in car document and incrementing the number of times car was booked
                carResult['timesBooked']++;
                carResult['bookings'].push({
                    by: customerId,
                    from: info['from'],
                    to: info['to']
                })

                // Calculate the number of days between the requested dates
                let daydifference = (date1, date2) => {
                    let firstDate = new Date(`${date1}`)
                    let secondDate = new Date(`${date2}`)
                    let timeDifference = secondDate.getTime() - firstDate.getTime()
                    return timeDifference / (1000 * 3600 * 24)
                }

                // Setting up an order document for the database
                let order = {
                    customer: customerId,
                    car: carResult['_id'],
                    from: info['from'],
                    to: info['to'],
                    days: daydifference(info['from'], info['to']) + 1,  // Adding 1 to the result since a date minus itself returns 0 when effectively its 1 day.
                    totalPrice: (daydifference(info['from'], info['to']) + 1) * carResult['price']
                }
                // Saving our new order
                 const newOrder = await new Order(order)
                 const y =  await newOrder.save()

                // // Updating the car database to show new occupied dates
                 const x = await carResult.save();
                 return x;
            }
        }

        catch (err) {
            console.log('this is err: ' + err);
        }
    },

    async getStatistics() {
        let statistics = {};
        let customerCount = await Customer.countDocuments();
        let carCount = await Car.countDocuments();
        let orderCount = await Order.countDocuments();

        findMostBooked = async () => {
            let cars = await Car.find({});
            let biggest = cars[0]['timesBooked'];
            let carName = cars[0]
            for (let i = 0; i < cars.length; i++) {
                if (cars[i]['timesBooked'] > biggest) {
                    biggest = cars[i]['timesBooked']
                    carName = cars[i]
                }
            }
            return carName;
        }

        findLeastBooked = async () => {
            let cars = await Car.find({});
            let smallest = cars[0]['timesBooked'];
            let carName = cars[0]
            for (let i = 0; i < cars.length; i++) {
                if (cars[i]['timesBooked'] < smallest) {
                    smallest = cars[i]['timesBooked']
                    carName = cars[i]
                }
            }
            return carName;
        }

        let mostBooked = await findMostBooked(); // This is the car with the highest number of bookings
        let leastBooked = await findLeastBooked();

        statistics.customers = customerCount;
        statistics.cars = carCount;
        statistics.orders = orderCount
        statistics.mostBookedCar = {car: `${mostBooked['manufacturer']} ${mostBooked['model']}`,
                                    numberOfBookings: `${mostBooked['timesBooked']}`};
        statistics.leastBookedCar = {car: `${leastBooked['manufacturer']} ${leastBooked['model']}`,
                                    numberOfBookings: `${leastBooked['timesBooked']}`};

        //let cars = await Car.find({});

        return statistics;

    },

    async deleteCar(info) {
        try {
        let carId = info.deleteInput
        let deleted = await Car.deleteOne({_id: carId})
        return deleted;
        }
        catch(err) {
            console.log(err);
        }
    }
}


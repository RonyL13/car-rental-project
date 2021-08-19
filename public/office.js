let addCarForm = document.querySelector('#addCarForm')
addCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let manufacturerInput = document.querySelector('#manufacturerInput').value;
    let modelInput = document.querySelector('#modelInput').value;
    let yearInput = document.querySelector('#yearInput').value;
    let plateInput = document.querySelector('#plateInput').value;
    let colorInput = document.querySelector('#colorInput').value;
    let seatsInput = document.querySelector('#seatsInput').value;
    let priceInput = document.querySelector('#priceInput').value;
    let transmissionInput = document.querySelector('#transmissionInput').value;
    let imageInput = document.querySelector('#imageInput').value;

    let errors = [];
    let errorElement = document.querySelector('.addCarErrorContainer')

    if (yearInput < 1920 || yearInput > new Date().getFullYear()) {
        errors.push(`Year must be between 1920 and ${new Date().getFullYear()}`)
    }
    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n')
    } else {
    let info = {
        manufacturer: manufacturerInput,
        model: modelInput,
        year: yearInput,
        plate: plateInput,
        color: colorInput,
        seats: seatsInput,
        price: priceInput,
        transmission: transmissionInput,
        image: imageInput
    }
    
    fetch('http://localhost:5000/addcar', {
        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.querySelector('.addCarResultDiv');
            resultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
            let str = '';
            if (data.msg === `Added new car successfully`) {
                str += `<div class="success">${data.msg}</div>`
            } else {
                str += `<div class="failure">${data.msg}</div>`
            }
            resultDiv.innerHTML = str;
        })
        .catch((err) => {
            `An error occured while attempting to fetch: ${err}`
        })
}});

    
fetch('http://localhost:5000/statistics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let str = `<h1>Statistics</h1>
                   <div class="stat">Number of Customers: ${data.customers}</div>
                   <div class="stat">Number of Cars: ${data.cars}</div>
                   <div class="stat">Number of Orders: ${data.orders}</div>
                   <div class="stat"><h4>Most Booked Car:</h4>${data.mostBookedCar.car}<br><br> Times booked: ${data.mostBookedCar.numberOfBookings}</div>
                   <div class="stat"><h4>Least Booked Car:</h4>${data.leastBookedCar.car}<br><br> Times booked: ${data.leastBookedCar.numberOfBookings}</div>
                `;
         document.querySelector('.statisticsContainer').innerHTML = str;

    })
    .catch((err) => {
        console.log(err);
    })


    let deleteCarForm = document.querySelector('.deleteCarForm')
    deleteCarForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let deleteInput = document.querySelector('#deleteCarInput').value;

        fetch('http://localhost:5000/deletecar', {
        
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({deleteInput})
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.querySelector('.deleteCarResultDiv');
            resultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
            let str = '';
            if (data.deletedCount === 0 || data.message) { // Check whether we got an error message or if mongoose didnt delete a record
                str += `<div class="failure">Record does not exists or has already been deleted</div>`
            } else {
                str += `<div class="success">Car successfully deleted</div>`
            }
            resultDiv.innerHTML = str;
        })
        .catch((err) => {
            `An error occured while attempting to fetch: ${err}`
        })
    })

    let deleteCustomerForm = document.querySelector('.deleteCustomerForm')
    deleteCustomerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let deleteInput = document.querySelector('#deleteCustomerInput').value;

        fetch('http://localhost:5000/deletecustomer', {
        
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({deleteInput})
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.querySelector('.deleteCustomerResultDiv');
            resultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
            let str = '';
            if (data.deletedCount === 0 || data.message) { // Check whether we got an error message or if mongoose didnt delete a record
                str += `<div class="failure">Record does not exist or has already been deleted</div>`
            } else {
                str += `<div class="success">Customer successfully deleted</div>`
            }
            resultDiv.innerHTML = str;
        })
        .catch((err) => {
            `An error occured while attempting to fetch: ${err}`
        })
    })
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
    }
});


fetch('http://localhost:5000/statistics', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        let str = `<div class="statisticsTitle">Statistics Overview</div>
                    <div class="statisticsContainer">
                        <div class="stat">Number of Customers: <br><br><br> ${data.customers}</div>
                        <div class="stat">Number of Cars: <br><br><br> ${data.cars}</div>
                        <div class="stat">Number of Orders: <br><br><br> ${data.orders}</div>
                        <div class="stat"><h4>Most Booked Car:</h4>${data.mostBookedCar.car}<br><br> Times booked: ${data.mostBookedCar.numberOfBookings}</div>
                        <div class="stat"><h4>Least Booked Car:</h4>${data.leastBookedCar.car}<br><br> Times booked: ${data.leastBookedCar.numberOfBookings}</div>
                   </div>
                `;
        document.querySelector('.statsDiv').innerHTML = str;

    })
    .catch((err) => {
        console.log(err);
    })


let addAdminForm = document.querySelector('.addAdminForm')
addAdminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let errors = [];
    let errorElement = document.querySelector('.adminErrorElement');
    errorElement.innerText = '';

    let name = document.querySelector('#adminNameInput').value;
    let password = document.querySelector('#adminPasswordInput').value;
    let confirm = document.querySelector('#adminConfirmInput').value;
    let email = document.querySelector('#adminEmailInput').value;
    let phone = document.querySelector('#adminPhoneInput').value;
    let dl = document.querySelector('#adminDlInput').value;
    let gender = document.querySelector('#adminGenderInput').value;

    if (name.length > 20 || name.length < 4) {
        errors.push('Name must be between 4 and 20 characters long')
    }

    if (password !== confirm) {
        errors.push('Passwords do not match')
    }

    if (password.length < 6 || password.length > 20) {
        errors.push('Password must be between 6 and 20 characters long')
    }

    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n')
    } else {
        let adminInfo = {
            name: name,
            password: password,
            confirm: confirm,
            email: email,
            phone: phone,
            dl: dl,
            gender: gender,
            admin: true
        }

        fetch('http://localhost:5000/addadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminInfo)
        })
            .then(response => response.json())
            .then(data => {
                let adminResultDiv = document.querySelector('.adminResultDiv');
                adminResultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
                let adminStr = '';
                if (data.x) { // If admin was saved
                    adminStr += `<div class="success">Admin successfully added</div>`
                } else {
                    if (data.err.code === 11000) { // If duplication error occured
                        adminStr += `<div class="failure">This ${Object.keys(data.err.keyValue)} is already taken</div>` // Error message indicating that a field is already in use
                    } else if (data.err.errors.email) { // If email validation error occured
                        adminStr += `<div class="failure">${data.err.errors.email.message}</div>`
                    }
                }
                adminResultDiv.innerHTML = adminStr;

            })
            .catch((err) => {
                console.log(err);
            })
    }
});

let deleteCarForm = document.querySelector('.deleteCarForm')
deleteCarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let deleteInput = document.querySelector('#deleteCarInput').value;

    fetch('http://localhost:5000/deletecar', {

        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deleteInput })
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
        body: JSON.stringify({ deleteInput })
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

// ===========================================================================

let updateCarForm = document.querySelector('.updateCarForm')
updateCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let carIdInput = document.querySelector('.updateCarIdInput').value;
    let manufacturerInput = document.querySelector('.updateCarManufacturerInput').value;
    let modelInput = document.querySelector('.updateCarModelInput').value;
    let yearInput = document.querySelector('.updateCarYearInput').value;
    let plateInput = document.querySelector('.updateCarPlateInput').value;
    let colorInput = document.querySelector('.updateCarColorInput').value;
    let seatsInput = document.querySelector('.updateCarSeatsInput').value;
    let priceInput = document.querySelector('.updateCarPriceInput').value;
    let transmissionInput = document.querySelector('.updateCarTransmissionInput').value;
    let imageInput = document.querySelector('.updateCarImageInput').value;

    let errors = [];
    let errorElement = document.querySelector('.updateCarErrorContainer')

    let info = {
        id: carIdInput
    }

    if (manufacturerInput !== '') {
        info.manufacturer = manufacturerInput;
    }
    if (modelInput !== '') {
        info.model = modelInput;
    }
    if (yearInput !== '') {
        if (yearInput < 1920 || yearInput > new Date().getFullYear()) {
            errors.push(`Year must be between 1920 and ${new Date().getFullYear()}`)
        } else {
            info.year = yearInput
        }
    }
    if (plateInput !== '') {
        info.plate = plateInput;
    }
    if (colorInput !== '') {
        info.color = colorInput;
    }
    if (seatsInput !== '') {
        info.seats = seatsInput;
    }
    if (priceInput !== '') {
        info.price = priceInput;
    }
    if (transmissionInput !== '') {
        info.transmission = transmissionInput;
    }
    if (imageInput !== '') {
        info.image = imageInput;
    }


    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n')
    } else {
        fetch('http://localhost:5000/updatecar', {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(response => response.json())
            .then(data => {
                let updateCarResultDiv = document.querySelector('.updateCarResultDiv');
                updateCarResultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
                let str = '';
                if (data.msg === 'Car successfully updated') {
                    str += `<div class="success">${data.msg}</div>`
                } else {
                    str += `<div class="failure">${data.msg}</div>`
                }
                updateCarResultDiv.innerHTML = str;
            })
            .catch((err) => {
                `An error occured while attempting to fetch: ${err}`
            })
    }
});




let updateCustomerForm = document.querySelector('.updateCustomerForm')
updateCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let customerIdInput = document.querySelector('.updateCustomerIdInput').value;
    let nameInput = document.querySelector('.updateCustomerNameInput').value;
    let emailInput = document.querySelector('.updateCustomerEmailInput').value;
    let phoneInput = document.querySelector('.updateCustomerPhoneInput').value;
    let dlInput = document.querySelector('.updateCustomerDlInput').value;
    let genderInput = document.querySelector('.updateCustomerGenderInput').value;

    let errors = [];
    let errorElement = document.querySelector('.updateCustomerErrorContainer')

    let info = {
        id: customerIdInput
    }

    if (nameInput !== '') {
        info.name = nameInput;
    }
    if (emailInput !== '') {
        info.email = emailInput;
    }
    if (phoneInput !== '') {
        info.phone = phoneInput;
    }
    if (dlInput !== '') {
        info.dl = dlInput;
    }
    if (genderInput !== '') {
        info.gender = genderInput;
    }

    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n')
    } else {
        fetch('http://localhost:5000/updatecustomer', {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(response => response.json())
            .then(data => {
                let updateCustomerResultDiv = document.querySelector('.updateCustomerResultDiv');
                updateCustomerResultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
                let str = '';
                if (data.msg === 'Customer successfully updated') {
                    str += `<div class="success">${data.msg}</div>`
                } else {
                    str += `<div class="failure">${data.msg}</div>`
                }
                updateCustomerResultDiv.innerHTML = str;
            })
            .catch((err) => {
                `An error occured while attempting to fetch: ${err}`
            })
    }
});



let updateAdminForm = document.querySelector('.updateAdminForm')
updateAdminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let customerIdInput = document.querySelector('#updateAdminIdInput').value;
    let info = {
        id: customerIdInput
    }

    fetch('http://localhost:5000/updateadmin', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
        .then(response => response.json())
        .then(data => {
            let updateAdminResultDiv = document.querySelector('.updateAdminResultDiv');
            updateAdminResultDiv.innerHTML = ''; // Resetting the error/success div each time this function is called
            let str = '';
            if (data.msg === 'Admin privileges given' || data.msg === 'Admin privileges removed') {
                str += `<div class="success">${data.msg}</div>`
            } else {
                str += `<div class="failure">${data.msg}</div>`
            }
            updateAdminResultDiv.innerHTML = str;
        })
        .catch((err) => {
            `An error occured while attempting to fetch: ${err}`
        })
})
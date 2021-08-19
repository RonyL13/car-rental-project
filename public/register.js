let form = document.querySelector('#form')


// Extracts info from form and puts it in an object. Afterwards this function will send a POST request using fetch api.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errorElement = document.querySelector('#error')

    let nameId = document.querySelector('#nameId').value;
    let password = document.querySelector('#passwordId').value;
    let confirm = document.querySelector('#confirmId').value;
    let emailId = document.querySelector('#emailId').value;
    let phoneId = document.querySelector('#phoneId').value;
    let dlId = document.querySelector('#dlId').value;
    let genderId = document.querySelector('#genderId').value;

    let errors = [];

    if (password !== confirm) {
        errors.push('Confirm password does not match password')
    }

    if (password.length < 6 || password.length > 12) {
        errors.push('Password must be between 6 and 12 characters long')
    }

    

    if (errors.length > 0) {
        errorElement.innerText = errors.join(', ')
    } else {
        let info = {
            name: nameId,
            password: password,
            confirm: confirm,
            email: emailId,
            phone: phoneId,
            dl: dlId,
            gender: genderId
        }
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(location.href = 'http://localhost:5000/register/successful');

    }
});

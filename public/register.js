let form = document.querySelector('#form')


// Extracts info from form and puts it in an object. Afterwards this function will send a POST request using fetch api.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errorElement = document.querySelector('.errorContainer')

    let name = document.querySelector('#nameId').value;
    let password = document.querySelector('#passwordId').value;
    let confirm = document.querySelector('#confirmId').value;
    let email = document.querySelector('#emailId').value;
    let phone = document.querySelector('#phoneId').value;
    let dl = document.querySelector('#dlId').value;
    let gender = document.querySelector('#genderId').value;

    let errors = [];

    if (name.length > 20 || name.length < 4) {
        errors.push('Name must be between 4 and 20 characters long')
    }

    if (password !== confirm) {
        errors.push('Passwords do not match')
    }

    if (password.length < 6 || password.length > 12) {
        errors.push('Password must be between 6 and 12 characters long')
    }


    

    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n')
    } else {
        let info = {
            name: name,
            password: password,
            confirm: confirm,
            email: email,
            phone: phone,
            dl: dl,
            gender: gender
        }


        fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                window.location = './register/successful'
            } else {
                alert(`This ${Object.keys(data.errorData)} is already taken`) // Error message indicating that a field is already in use
            }
        })
        .catch((error) => {
        console.error('Error:', error);
        })
        }});


        
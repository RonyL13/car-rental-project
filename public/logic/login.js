let loginForm = document.querySelector('.loginForm')


// Extracts info from form and puts it in an object. Afterwards this function will send a POST request using fetch api.
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grabbing the error div
    let errorContainer = document.querySelector('.errorContainer')


    // Reset the error values each time the submit is clicked
    errorContainer.textContent = "";

    // Grabbing the user input values
    let email = document.querySelector('#emailInput').value;
    let password = document.querySelector('#passwordInput').value;


    let info = {
        email: email,
        password: password
    }


    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    })
        .then(response => response.json())
        .then(data => {
            if(data.customer) {
                location.assign('/')
            } else {
                errorContainer.textContent = 'Incorrect Email or Password'
            }
        })
});



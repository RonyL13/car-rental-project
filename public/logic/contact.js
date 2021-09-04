let sendForm = document.querySelector('#contactform');

sendForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstNameInput = document.querySelector('.fname').value;
    let lastNameInput = document.querySelector('.lname').value;
    let emailInput = document.querySelector('.email').value;
    let phoneInput = document.querySelector('.phone').value;
    let msgInput = document.querySelector('.comment').value;


    let info = {
        fname: firstNameInput,
        lname: lastNameInput,
        email: emailInput,
        phone: phoneInput,
        comment: msgInput
    }

    fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.querySelector('.resultContainer')
            resultDiv.innerHTML = '';
            let str = '';
            if (data.msg === 'Message sent successfully') {
                str += `<p class="success">${data.msg}</p>`
            }

            resultDiv.innerHTML = str;
        })
        .catch((err) => {
            console.log(err);
        })
})
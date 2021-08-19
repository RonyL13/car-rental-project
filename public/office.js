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
    .catch((err) => {
        `An error occured while attempting to fetch: ${err}`
    })
});

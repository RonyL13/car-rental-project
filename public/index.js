let searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let manufacturerInput = document.querySelector('#manufacturerInput').value;
    let modelInput = document.querySelector('#modelInput').value;
    let yearInput = document.querySelector('#yearInput').value;

    let data = {};

    // Filter out the input fields that the user left empty
    if (manufacturerInput !== "") {
        data['manufacturer'] = manufacturerInput;
    }
    if (modelInput !== "") {
        data["model"] = modelInput;
    }
    if (yearInput !== "") {
        data["year"] = yearInput;
    }
    fetch('http://localhost:5000/getsomecars/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {         
            if (data.length !== 0) { 
            document.querySelector('#resultsContainer').innerHTML = '';
            
            // Creation of the result component and appending it to the results gallery
            let carComponent = '';
            for (let i = 0; i < data.length; i++) {
                // Check if car is already booked
                if (data[i]['booking']['isBooked'] === true) {
                    carComponent += `<div class="booked">
                                        <img src="${data[i]['image']}">
                                        <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                        <p>Model: ${data[i]['model']}</p>
                                        <p>Year: ${data[i]['year']}</p>
                                        <p>Transmission: ${data[i]['transmission']}</p>
                                        <p>Color: ${data[i]['color']}</p>
                                        <p>Price per day: ${data[i]['price']} &#8362</p>
                                        <button class="bookBtn" index="${data[i]['_id']}" onClick="bookCar(this)">Book</button>
                                    </div>`
                } else {
                    carComponent += `<div>
                                        <img src="${data[i]['image']}">
                                        <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                        <p>Model: ${data[i]['model']}</p>
                                        <p>Year: ${data[i]['year']}</p>
                                        <p>Transmission: ${data[i]['transmission']}</p>
                                        <p>Color: ${data[i]['color']}</p>
                                        <p>Price per day: ${data[i]['price']} &#8362</p>
                                        <button class="bookBtn" index="${data[i]['_id']}" onClick="bookCar(this)">Book</button>
                                    </div>`
                }
            }
            document.querySelector('#resultsContainer').innerHTML = carComponent;

        // If no results found in DB return a message explaining that
        } else { 
            document.querySelector('#resultsContainer').innerHTML = 'No results found, try widening your search parameters';

        }
    })
    // Fetch error handling
    .catch((err) => {
        console.log(`An error occured while trying to fetch data: ${err}`)
    })

})


bookCar = (index) => {

    // Every car component is created with a button whose "index" attribute corresponds to the car's database _Id
    let carId = { id: index.getAttribute('index') };
    fetch('http://localhost:5000/bookcar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carId)
    })
    .then(response => response.json())
    .then(data => {
        if (!data) {        // In case the user isn't logged in data should be false therefore we check if !data
            location.assign('/login')
        } else {
            console.log(data);
        }
    })
    .catch((err) => {
        console.log(`An error occured while attempting to fetch: ${err}`);
    })
    
}

showUnavailable = () => {
    document.querySelector('.booked').style.display = 'block';
}
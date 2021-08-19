let searchForm = document.querySelector('#searchForm');

function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
 }

function getMaxDate() {
    let twoMonthsFromToday = new Date();
    let dd = String(twoMonthsFromToday.getDate()).padStart(2, '0');
    let mm = String(twoMonthsFromToday.getMonth() + 3).padStart(2, '0'); //January is 0!
    let yyyy = twoMonthsFromToday.getFullYear();

    twoMonthsFromToday = yyyy + '-' + mm + '-' + dd;
    return twoMonthsFromToday;
 }
console.log(getMaxDate(), getToday());
 // ========================================================

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let errors = [];
    let errorElement = document.querySelector('.errorContainer');
    errorElement.innerText = '';
    let manufacturerInput = document.querySelector('#manufacturerInput').value;
    let modelInput = document.querySelector('#modelInput').value;
    let yearInput = document.querySelector('#yearInput').value;
    let fromInput = document.querySelector('#fromInput').value;
    let toInput = document.querySelector('#toInput').value;
    console.log(toInput, fromInput);
    if (fromInput > toInput) { // bigger = later smaller = before
        errors.push("Returning date can't be earlier than starting date");
    } 
    
    if (fromInput < getToday() || getMaxDate() < toInput) {
        errors.push('You can only select dates within the next two months');
    }

    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n');
        document.querySelector('#resultsContainer').innerHTML = ''; // Reseting the results gallery 
    }   else {

    let info = {
        params: {},
        date: {
            from: fromInput,
            to: toInput
        }
    };

    // Filter out the input fields that the user left empty
    if (manufacturerInput !== "") {
        info['params']['manufacturer'] = manufacturerInput;
    }
    if (modelInput !== "") {
        info['params']["model"] = modelInput;
    }
    if (yearInput !== "") {
        info['params']["year"] = yearInput;
    }

    fetch('http://localhost:5000/getsomecars/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    })
        .then(response => response.json())
        .then(data => {
            if (data.length !== 0) {
                document.querySelector('#resultsContainer').innerHTML = '';
                // Creation of the result component and appending it to the results gallery
                let carComponent = '';
                for (let i = 0; i < data.length; i++) {
                    // Checking to see if the selected date range overlaps with the current (if exists) booked date range
                    if((info['date']['from'] <= data[i]['booking']['to']) && (data[i]['booking']['from'] <= info['date']['to'])) {
                        carComponent += `<div class="booked">
                                        <img src="${data[i]['image']}">
                                        <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                        <p>Model: ${data[i]['model']}</p>
                                        <p>Year: ${data[i]['year']}</p>
                                        <p>Transmission: ${data[i]['transmission']}</p>
                                        <p>Color: ${data[i]['color']}</p>
                                        <p>Price per day: ${data[i]['price']} &#8362</p>
                                        <p class="currUnavailable">Unavailable at given dates</p>
                                    </div>`
                    } else {
                        carComponent += `<div class="carComponent">
                                        <img src="${data[i]['image']}">
                                        <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                        <p>Model: ${data[i]['model']}</p>
                                        <p>Year: ${data[i]['year']}</p>
                                        <p>Transmission: ${data[i]['transmission']}</p>
                                        <p>Color: ${data[i]['color']}</p>
                                        <p>Price per day: ${data[i]['price']} &#8362</p>
                                        <button class="bookBtn" index="${data[i]['_id']}" onClick="bookCar(this, '${fromInput}', '${toInput}')">Book</button>
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

}})



bookCar = (index, from, to) => {
    // Every car component is created with a button whose "index" attribute corresponds to the car's database _Id
    let carId = index.getAttribute('index');

    let info = {
        id: carId,
        from: from,
        to: to
    }
    fetch('http://localhost:5000/bookcar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
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
    let unavailableCars = document.querySelectorAll('.booked')
    unavailableCars.forEach(car => car.style.display = 'block')
}

hideUnavailable = () => {
    let unavailableCars = document.querySelectorAll('.booked')
    unavailableCars.forEach(car => car.style.display = 'none')
}
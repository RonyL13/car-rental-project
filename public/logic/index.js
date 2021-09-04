let searchForm = document.querySelector('.searchForm');


// Helper functions
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


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


// ========================================================
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let errors = [];
    let errorElement = document.querySelector('.errorContainer');
    errorElement.innerText = '';
    let manufacturerInput = capitalize(document.querySelector('#manufacturerInput').value);
    let modelInput = capitalize(document.querySelector('#modelInput').value);
    let yearInput = document.querySelector('#yearInput').value;
    let transmissionInput = document.querySelector('#transmissionInput').value;
    let fromInput = document.querySelector('#fromInput').value;
    let toInput = document.querySelector('#toInput').value;

    if (fromInput > toInput) { // bigger = after smaller = before
        errors.push("Returning date can't be earlier than starting date");
    }

    if (fromInput < getToday() || getMaxDate() < toInput) {
        errors.push('You can only select dates within the next two months');
    }

    if (errors.length > 0) {
        errorElement.innerText = errors.join('\n');
        document.querySelector('#resultsContainer').innerHTML = ''; // Reseting the results gallery 
    } else {

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
        if (transmissionInput !== "") {
            info['params']["transmission"] = transmissionInput;
        }

        fetch('/getsomecars/', {
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
                    for (let i = 0; i < data.length; i++) { // Outer loop iterates over the returned cars
                        if (data[i]['bookings'].find(current => info['date']['from'] <= current['to'] && (current['from'] <= info['date']['to']))) { // The find searches for an occupied date and exits
                            carComponent += `<div class="booked">
                                <img src="${data[i]['image']}">
                                <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                <p>Model: ${data[i]['model']}</p>
                                <p>Year: ${data[i]['year']}</p>
                                <p>Transmission: ${data[i]['transmission']}</p>
                                <p>Color: ${data[i]['color']}</p>
                                <p>Seats: ${data[i]['seats']}</p>
                                <p>Price per day: ${data[i]['price']} &#8362</p>
                                <p class="currUnavailable">Unavailable at requested dates</p>
                                </div>`
                        } else { // If an occupied date isnt found find returns Undefined and this else is running
                            carComponent += `<div class="carComponent">
                                <img src="${data[i]['image']}">
                                <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                <p>Model: ${data[i]['model']}</p>
                                <p>Year: ${data[i]['year']}</p>
                                <p>Transmission: ${data[i]['transmission']}</p>
                                <p>Color: ${data[i]['color']}</p>
                                <p>Seats: ${data[i]['seats']}</p>
                                <p>Price per day: ${data[i]['price']} &#8362</p>
                                <button class="bookBtn" index="${data[i]['_id']}" onClick="bookCar(this, '${fromInput}', '${toInput}')">Book</button>
                                </div>`
                                
                        }
                    }
                    
                    document.querySelector('#resultsContainer').innerHTML = carComponent;

                    showUnavailable = () => {
                        let showUnavailable = document.querySelector('.showUnavailable');
                        let unavailableCars = document.querySelectorAll('.booked')

                        if (showUnavailable.checked) {
                            unavailableCars.forEach(car => car.style.display = 'block')
                        } else {
                            unavailableCars.forEach(car => car.style.display = 'none')
                        }
                    }
                    showUnavailable();
                    location.assign('#resultsContainer') // Scroll the user down to results
                } else {
                    // If no cars are found
                    document.querySelector('#resultsContainer').innerHTML = 'No results found, try widening your search parameters';
                }
            }

            )
            // Fetch error handling
            .catch((err) => {
                console.log(`An error occured while trying to fetch data: ${err}`)
            })

    }
})



bookCar = (index, from, to) => {
    // Every car component is created with a button whose "index" attribute corresponds to the car's database _Id
    let carId = index.getAttribute('index');

    let info = {
        id: carId,
        from: from,
        to: to
    }
    fetch('/bookcar', {
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
                index.disabled = true;
                location.assign(`/profile`)
            }
        })
        .catch((err) => {
            console.log(`An error occured while attempting to fetch: ${err}`);
        })

}
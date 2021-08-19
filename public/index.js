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
            carComponent += `<div>
                                <img src="${data[i]['image']}">
                                <p>Manufacturer: ${data[i]['manufacturer']}</p>
                                <p>Model: ${data[i]['model']}</p>
                                <p>Year: ${data[i]['year']}</p>
                                <p>Color: ${data[i]['color']}</p>
                                <button>Book</button>
                                </div>`
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



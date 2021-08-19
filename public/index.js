let searchForm = document.querySelector('#searchForm')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('inside search function');
    let manufacturerInput = document.querySelector('#manufacturerInput').value;
    let modelInput = document.querySelector('#modelInput').value;
    let yearInput = document.querySelector('#yearInput').value;
    
    let info = {
        manufacturer: manufacturerInput,
        model: modelInput,
        year: yearInput
    }
    
    fetch('http://localhost:5000/addcar', {
        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
});
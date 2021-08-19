fetch('http://localhost:5000/getcustomerorders')
.then(response => response.json())
.then(data => {
    let ordersContainer = document.querySelector('.ordersContainer');
    let str = '';
    if (data['orders'].length === 0) {
        str += `No orders made`
    } else {
        for (let i = 0; i < data['orders'].length; i++) {
            str += `<div class="order">
                            <p>Order Id: ${data['orders'][i]['_id']}</p>
                            <p>Car name: ${data['cars'][i]['manufacturer']} ${data['cars'][i]['model']}</p>
                            <p>Reciveing date: ${data['orders'][i]['from'].split('T').shift()}</p> 
                            <p>Returning date: ${data['orders'][i]['to'].split('T').shift()}</p>
                            <p>Total number of days: ${data['orders'][i]['days']}</p>
                            <p>Total price: ${data['orders'][i]['totalPrice']} &#8362</p>
                        <img src="${data['cars'][i]['image']}" alt="Reserved car picture">
                        <div class="cancelOrderResultDiv"></div>
                        <button index="${data['orders'][i]['_id']}" class="cancelBtn" onclick="cancelOrder(this)">Cancel Order</button>
                    </div>`
        }
    }
    ordersContainer.innerHTML = str;

})
.catch((err) => {
    console.log(err);
})


cancelOrder = (index) => {
    if (window.confirm('Are you sure?')) {
    let orderId = index.getAttribute('index');
    fetch('http://localhost:5000/deleteorder', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: orderId })
    })
    .then(response => response.json())
    .then(data => {
        let resultDiv = document.querySelector('.cancelOrderResultDiv')
        resultDiv.innerHTML = '';
        let str = '';
        if (data.msg = 'Order Successfully Deleted') {
            str += `<div class="success">${data.msg}</div>`
            location.reload();
        } else {
            str += `<div class="failure">Cancellation failed</div>`

        }

        resultDiv.innerHTML = str;
    })
    .catch((err) => {
        console.log(err);
    })
}
}


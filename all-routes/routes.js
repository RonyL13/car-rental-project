const express = require('express')
const router = express.Router();
const myrepository = require('../myrepository')
const path = require('path')

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})

router.get('/register/successful', (req, res) => {
    res.render('successful')
})

router.post('/register', async (req, res) => {
    const x = await myrepository.addNewCustomer(req.body);
    res.send('test');
})

router.post('/addcar', async (req, res) => {
    console.log('inside router')
    const x = await myrepository.addNewCar(req.body);
    res.send('added new car successfully')
})




module.exports = router;

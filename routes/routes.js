const express = require('express')
const router = express.Router();
const myRepository = require('../myRepository')
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
    const x = await myRepository.createCustomer(req.body); // X Will be either true or false
    res.json(x)
})

router.post('/addcar', async (req, res) => {
    const x = await myRepository.createCar(req.body);
    res.send(`added new car ${x} successfully`)
})

// router.get('/getcars', async (req, res) => {
//     const x = await myrepository.getAllCars();
//     res.send(x)
// })

router.post('/getsomecars' , async (req, res) => {
    const x = await myRepository.getCarByFilters(req.body)
    res.send(x)
})

router.get('/office', (req, res) => {
    res.render('office', { title: 'Office' })
})



module.exports = router;

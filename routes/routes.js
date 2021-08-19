const express = require('express');
const router = express.Router();
const myRepository = require('../myRepository');
const { authenticate, checkUser, isAdmin } = require('../middleware/authMiddleware');

router.get('*', checkUser); // Use specified middleware in all GET requests

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
    const x = await myRepository.createCustomer(req.body); 
    res.cookie('jwt', x.token, { httpOnly: true, maxAge: 200000});
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

router.get('/office', authenticate, isAdmin , (req, res) => {
    res.render('office',  { title: 'Office' });
})

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
})

router.post('/login', async (req, res) => {
    const x = await myRepository.customerLogin(req.body);
    res.cookie('jwt', x.token, { httpOnly: true, maxAge: 200000000});
    res.send(x);
})

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // Sets the json web token to an empty string and make it expire after 1 ms (as good as deleteing it)
    res.redirect('/'); // Redirect the user to the home page after log out
})

router.put('/bookcar', authenticate, async (req, res) => {
    const x = await myRepository.bookCar(req.body, req.cookies.jwt)
    res.send(x);
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

module.exports = router;

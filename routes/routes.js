const express = require('express');
const router = express.Router();
const myRepository = require('../myrepository');
const { authenticate, checkUser, isAdmin } = require('../middleware/authMiddleware');
const path = require('path')


router.get('*', checkUser); // Use specified middleware in all GET requests

router.get('/profile', authenticate, (req, res) => {
    res.render('profile', { title: 'Profile' })
})

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
});

router.get('/views/images/fadingbackground.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/fadingbackground.png'))
})
router.get('/views/images/fadingbackground1.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/fadingbackground1.png'))
})
router.get('/images/bluecar.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/bluecar.png'))
})
router.get('/views/images/fadingbackground2.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/fadingbackground2.png'))
})
router.get('/views/images/blur-about-background.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/woodenoffice.jpeg'))
})
router.get('/views/images/rulerandpencil.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/rulerandpencil.png'))
})
router.get('/views/images/maleface.png', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/maleface.png'))
})
router.get('/views/images/abstractdarkbackground.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/images/abstractdarkbackground.jpeg'))
})

router.get('/faq', (req, res) => {
    res.render('faq', { title : 'FAQ'})
})

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
})

router.get('/successful', (req, res) => {
    res.render('successful', { title: 'Successful' })
})

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' })
})

router.post('/register', async (req, res) => {
    const x = await myRepository.createCustomer(req.body); 
    res.send(x)
})

router.post('/addcar', isAdmin, async (req, res) => {
    const x = await myRepository.createCar(req.body);
    res.send(x)
})

router.post('/getsomecars' , async (req, res) => {
    const x = await myRepository.getCarByFilters(req.body)
    res.send(x)
})

router.get('/office', isAdmin , (req, res) => {
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

router.post('/send', async (req, res) => {
    const x = await myRepository.sendEmail(req.body);
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

router.post('/statistics',isAdmin,  async (req, res) => {
    let x = await myRepository.getStatistics();
    res.send(x);
})

router.delete('/deletecar', isAdmin,  async (req, res) => {
    let x = await myRepository.deleteCar(req.body);
    res.send(x);
})

router.delete('/deletecustomer', isAdmin,  async (req, res) => {
    let x = await myRepository.deleteCustomer(req.body);
    res.send(x);
})

router.post('/addadmin', isAdmin, async (req, res) => {
    let x = await myRepository.createAdmin(req.body);
    res.send(x);
})

router.put('/updatecar', isAdmin, async (req, res) => {
    let x = await myRepository.updateCar(req.body);
    res.send(x)
})

router.put('/updatecustomer', isAdmin, async (req, res) => {
    let x = await myRepository.updateCustomer(req.body);
    res.send(x)
})



router.put('/updateadmin', isAdmin, async (req, res) => {
    let x = await myRepository.updateAdmin(req.body);
    res.send(x)
})

router.get('/getcustomerorders', async (req, res) => {
    const x = await myRepository.getCustomerOrders(req.cookies.jwt)
    res.send(x)
})

router.delete('/deleteorder', async (req, res) => {
    const x = await myRepository.deleteOrder(req.body);
    res.send(x);
})



module.exports = router;

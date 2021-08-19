const express = require('express')
const app = express();
const allRoutes = require('./all-routes/routes.js')

// set the template engine for dynamic html content
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('public'))
app.use('/', allRoutes);


// 404 error page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
})

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`);
})


// jwt library + bycript
// Login system management

//start with jwt

//read about preventdefault send form
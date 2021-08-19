const express = require('express')
const app = express();
const routes = require('./routes/routes.js')
const mongoose = require('mongoose')

// app.use((req, res, next) => {
//     console.log('hello');
//     next();
// })

// set the template engine for dynamic html content
app.set('view engine', 'ejs')


app.use(express.urlencoded({extended: true}))
app.use(express.json());

// middleware
app.use(express.static('public'))

// routing
app.use('/', routes);

// database connection
var url = `mongodb+srv://admin:12345@cluster0.0cco4.mongodb.net/site-database?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected successfully to MongoDB!'))
 .catch(err => console.error('Something went wrong', err));


// prevent deprecation warning
mongoose.set('useCreateIndex', true);


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
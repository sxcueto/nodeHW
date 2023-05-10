const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sxcueto:kable123@cluster0.6ozt3oi.mongodb.net/node-tuts';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded ({ extended: true }));
app.use(morgan('dev'));


//routes
app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about', { title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404', { title:'404'});
    
});


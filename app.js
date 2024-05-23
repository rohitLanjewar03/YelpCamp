const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOveride = require('method-override')
const catchAsync = require('./utils/catchAsync');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash'); 

const campgroundRoutes = require('./routes/campgrounds')

const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users');

const {campgroundSchema} = require('./schemas')
const {reviewSchema} = require('./schemas')
const Review = require('./models/review')
const Campground = require('./models/campground');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use(express.urlencoded({extended:true}))
app.use(methodOveride('_method'))
app.use(express.static(path.join(__dirname,'public')));

const sessionConfig = {
    secret : 'thisshould',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 100*60*60*24*7,
        maxAge: 100*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.engine('ejs',ejsMate);

const { title, constrainedMemory } = require('process');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);
app.use('/',userRoutes);

app.get('/', (req, res) => {
    res.render('index');
});


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

app.use((err,req,res,next)=>{
    const{ statusCode = 500 } = err;
    if(!err.message){
        err.message = 'Oh no, Something went wrong';
    }
    res.status(statusCode).render('error',{err});
})



app.listen(3000, () => {
    console.log('Listening on port 3000');
});
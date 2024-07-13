const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground')
const {places,descriptors} = require('./seedHelpers')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
});

const sample = array => array[Math.floor(Math.random()* array.length)];


const seedDB = async()=>{
    await Campground.deleteMany();
    for(let i=0 ; i<50 ; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            title:`${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city},${cities[random1000].state}`
        })
        await camp.save()
    }
}

seedDB();
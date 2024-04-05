const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const title = `${sample(descriptors)} ${sample(places)}`;
        console.log('Generated Title:', title); // Logging the generated title
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: title // Assigning the generated title
        });
        console.log('Campground Object:', camp); // Logging the campground object
        await camp.save();
    }
}

seedDB().then(() => {
   mongoose.connection.close();
})
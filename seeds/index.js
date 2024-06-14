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
        const price = Math.floor(Math.random()*100);
        console.log('Generated Title:', title); 

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: title ,
            image: 'https://source.unsplash.com/collection/483251',
            author: '664ccc34dd6950b1b49eec49',
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores atque sed quisquam nihil cum sequi facere tempora nulla fuga, id aut fugit voluptatem. Itaque non assumenda neque, sit asperiores fugit!',
            price: price,
            
        });

        console.log('Campground Object:', camp); // Logging the campground object
        await camp.save();
    }
}

seedDB().then(() => {
   mongoose.connection.close();
})



const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/', (req,res) => {
    res.render("index");
})

app.get('/makecampground',async(req,res)=>{
    const camp = new Campground({title : "My Backyard",description:'Cheap camping'})
    await camp.save();
    res.send(camp);
})


app.listen(3000,()=>{
    console.log("Listening on 3000")
})
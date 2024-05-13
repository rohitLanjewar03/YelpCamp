const express = require('express')
const router = express.Router({mergeParams:true});

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const {reviewSchema} = require('../schemas')

const Review = require('../models/review')
const Campground = require('../models/campground');

const validateReview = (req,res,next) =>{
    const{error} = reviewSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message,400);
    } else{
        next();
    }

}


router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted!');

    res.redirect(`/campgrounds/${id}`);
}))


router.post('/',validateReview,catchAsync(async(req,res) =>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Successfully added!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

module.exports = router;
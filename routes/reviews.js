const express = require('express')
const router = express.Router({mergeParams:true});

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const {reviewSchema} = require('../schemas')

const Review = require('../models/review')
const Campground = require('../models/campground');

const {validateReview, isLoggedIn,isReviewAuthor} = require('../middleware');

const reviews = require('../controllers/reviews');

router.delete('/:reviewId',isLoggedIn, isReviewAuthor,catchAsync(reviews.deleleReview))


router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview));

module.exports = router;
const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas.js');
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware.js')
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews.js')


router.post('/', validateReview,isLoggedIn, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;
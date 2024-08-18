const Joi = require('joi');
const review = require('./models/review');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string(),
        price: Joi.number().min(0).required(),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        body: Joi.string().required()
    }).required()
})
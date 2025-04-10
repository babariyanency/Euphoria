const express = require('express')
const { addReview, fetchReviewByUser, fetchAllReviews, deleteFromReview } = require('../controller/Review')

const router = express.Router()
router.post('/', addReview)
router.get('/:id', fetchReviewByUser)
    .get('/', fetchAllReviews)
    .delete('/:id', deleteFromReview);
  
exports.router = router
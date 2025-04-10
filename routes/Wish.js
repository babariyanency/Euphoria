const express = require('express')
const { addToWish, fetchWishByUser, deleteFromWish } = require('../controller/Wish')

const router = express.Router()
router.post('/', addToWish)
    .get('/:id', fetchWishByUser)
    .delete('/:id', deleteFromWish)
  
exports.router = router
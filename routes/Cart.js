const express = require('express')
const { addToCart, fetchCartByUser, deleteFromCart } = require('../controller/Cart')

const router = express.Router()
router.post('/', addToCart)
    .get('/:id', fetchCartByUser)
    .delete('/:id', deleteFromCart)
exports.router = router
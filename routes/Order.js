const express = require('express')
const { createOrder, updateOrder, SelectOrder, fetchAllOrders } = require('../controller/Order')

const router = express.Router()
router.post('/', createOrder)
    .get('/:id', SelectOrder)
    .patch('/:id', updateOrder)
    .get('/', fetchAllOrders)
    exports.router = router
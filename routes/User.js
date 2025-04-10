const express = require('express')
const { createUser, login, updateUser, resetUser, fetchAllUser, activeUser } = require('../controller/User')
const router = express.Router()
router.post('/', createUser)
    .post('/login', login)
    .patch('/:id', updateUser)
    .post('/reset', resetUser)
      .get('/', fetchAllUser)
      .patch('/useractive/:id',activeUser)
    
exports.router = router
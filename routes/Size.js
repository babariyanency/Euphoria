const express = require('express')
const { fatchSize, createSize } = require('../controller/Size')

const router = express.Router()
router.get('/',fatchSize)
      .post('/',createSize)
exports.router=router
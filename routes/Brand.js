const express = require('express')
const { fatchBrands, createBrand, deleteBrands, deleteValue } = require('../controller/Brand')

const router = express.Router()
router.get('/', fatchBrands)
      .post('/', createBrand)
      .delete('/:id', deleteBrands)
      .get('/:id', deleteValue);
exports.router = router
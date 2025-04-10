const express = require("express");
const { createProduct, fatchAllProducts, updateProducts, fetchProductById } = require("../controller/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../../frontend-app/src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("thumbnail"), createProduct)
  .get('/',fatchAllProducts)
  .post("/update/:id",updateProducts)
  .get('/:id', fetchProductById);

exports.router = router;

const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    brand: req.body.brand,
    sizes: req.body.sizes,
    thumbnail: req.file.filename,
  });
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fatchAllProducts = async (req, res) => {

  let condition = {}

  let query = Product.find(condition);

  if (req.query.value) {
    query = query.find({ brand: req.query.value });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }


  try {
    const docs = await query.exec();
    res.status(200).json(docs);
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const updateProducts = await Product.findByIdAndUpdate(req.params.id, req.body).exec();

    res.status(200).json(updateProducts);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};



const { Brand } = require("../model/Brand");
const Product = require("../model/Product");


exports.fatchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {

  const brand = new Brand(
    {
      label: req.body.label,
      value: req.body.value
    }
  );
  try {
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err)
  }

};

exports.deleteBrands = async (req, res) => {
  const { id } = req.params;

  try {
    const brands = await Brand.findOneAndDelete({ value: id });
    // console.log(brands)
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};


// exports.deleteBrands = async (req, res) => {
//   const brandName = req.params.id;
//   console.log(brandName);

//   try {
//     const isUsed = await Product.find({ brand: brandName });

//     if (isUsed) {
//       return res.status(400).json({ message: " Brand is used by products. Cannot delete." });
//     }

//     const deleted = await Brand.findOneAndDelete({ name: brandName });
//     res.status(200).json(deleted);

//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ message: " Server error", error: err });
//   }
// };


exports.deleteValue = async (req, res) => {
  const brandId = req.params.id;
  try {
    const products = await Product.find({ brand: brandId });
    res.json(products);

  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error", error: err });
  }
};



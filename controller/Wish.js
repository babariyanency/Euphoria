
const { Wish } = require("../model/Wish");

exports.addToWish = async (req, res) => {
    const wish = new Wish(req.body);
    console.log(wish);
    try {
        const doc = await wish.save();
        // console.log(doc);

        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err)
    }

};
exports.fetchWishByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const wishItems = await Wish.find({ user: id }).populate('product');
        console.log(wishItems);

        res.status(200).json(wishItems);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteFromWish = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Wish.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};


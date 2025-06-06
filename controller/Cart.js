const { Cart } = require("../model/Cart");

exports.addToCart = async (req, res) => {
    const cart = new Cart(req.body);
    // console.log(cart);
    try {
        const doc = await cart.save();
        // console.log(doc);

        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err)
    }

};
exports.fetchCartByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItems = await Cart.find({ user: id }).populate('product');
        console.log(cartItems);
        
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Cart.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};


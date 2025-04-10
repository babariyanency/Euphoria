const { Order } = require("../model/Order");
const Product = require("../model/Product");
const { User } = require("../model/User");
const { invoiceTemplate, sendMail } = require("../Serives.js/Common");

exports.createOrder = async (req, res) => {

    const order = new Order(req.body);

    try {
        const doc = await order.save();
        const user = await User.findById(order.user)
        sendMail({ to: user.email, html: invoiceTemplate(order), subject: 'Order Received' })

        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json(err)
    }

};
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};
exports.SelectOrder = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const order = await Order.find({ user: id }).sort({createdAt:-1});
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchAllOrders = async (req, res) => {
    let totalOrders = Order.find(req.body);

    try {
        const docs = await totalOrders.exec();
        console.log(docs);

        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};



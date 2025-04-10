const { User } = require("../model/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const data = new User({
        email: req.body.email,
        password: hash,
        role: req.body.role,
        name: req.body.name,
    });
    data.save().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })

};

exports.resetUser = async (req, res) => {

    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const data = new User({
        email: req.body.email,
        password: hash,
    });

    try {
        const user = await User.findOneAndUpdate({ email: req.body.email }, { password: data.password });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }

};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invelid email or password')

        }
        if(!user.isactive)
            return res.status(400).send('User is Blocked')

        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword);

        if (!validPassword) {
            return res.status(400).send('Invelid email or password')
        }
        // const role = user.role
        // var token = jwt.sign({ id: user.id }, 'nency123');

        res.json({
            // token,
            id: user.id,
            email: user.email,
            addresses: user.addresses,
            role: user.role,
        })

    } catch (err) {
        res.status(400).json(err);
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.activeUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const user = await User.findByIdAndUpdate(id,{isactive: req.body.isactive}, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchAllUser = async (req, res) => {
    try {
        const docs = await User.find({ role: 'user' },'id name email role isactive ');
        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};

const { Review } = require("../model/Review");
const { User } = require("../model/User");

exports.addReview = async (req, res) => {



    const user = await User.findOne({ email: req.body.email })


    console.log("userdata", user);
    try {
        const newreviewobj = {
            review: req.body.review,
            rating: req.body.rating,
            email: req.body.email,
            name: user.name,
            productId: req.body.productId
        }
        const rev = Review(newreviewobj)
        const doc = await rev.save();

        res.status(201).json(doc);
    } catch (err) {
        console.log(err);

        res.status(400).json(err);
    }
};


exports.fetchReviewByUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const reviewItems = await Review.find({ productId: id });
        console.log("reviewdata ", reviewItems);

        res.status(200).json(reviewItems);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchAllReviews = async (req, res) => {
    let totalReviews = Review.find(req.body);

    try {
        const docs = await totalReviews.exec();
        console.log(docs);

        res.status(200).json(docs);
    } catch (err) {
        res.status(400).json(err);
    }
};
exports.deleteFromReview = async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await Review.findByIdAndDelete(id);

        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};


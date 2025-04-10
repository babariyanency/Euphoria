const mongoose = require("mongoose");
const { Schema } = mongoose

const reviewSchema = new Schema({
    review: { type: String, required: true },
    rating: { type: Number },
    productId: { type: String },
    email: { type: String },
    name: { type: String },
}, { timestamps: true })
const virtual = reviewSchema.virtual('id')
virtual.get(function () {
    return this._id
})
reviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Review = mongoose.model('Review', reviewSchema)
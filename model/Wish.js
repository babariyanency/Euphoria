const mongoose = require("mongoose");
const { Schema } = mongoose

const wishSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})
const virtual = wishSchema.virtual('id')
virtual.get(function () {
    return this._id
})
wishSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Wish = mongoose.model('Wish', wishSchema)
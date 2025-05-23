const mongoose = require("mongoose");
const { Schema } = mongoose

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sizes: { type: [Schema.Types.Mixed] },
    price: { type: Number, required: true }
})
const virtual = cartSchema.virtual('id')
virtual.get(function () {
    return this._id
})
cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Cart = mongoose.model('Cart', cartSchema)
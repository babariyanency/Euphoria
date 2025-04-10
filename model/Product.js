const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    price:{type:Number},
    rating:{type:Number,min:[0,'wrong minimum rating'],max:[10000,'worng maximum rating'],default:0},
    brand:{type:String,required:true},
    thumbnail:{type:String,required:true},
    sizes:{type:[Schema.Types.Mixed]},
})
const virtualId =productSchema.virtual('id')
virtualId.get(function(){
    return this._id
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

const Product = mongoose.model('Products',productSchema)
module.exports =Product
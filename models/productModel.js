import mongoose,{Schema} from "mongoose";


const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
       
    },
    desc: {
        type: String,
        required: true
    },
    categoriesSeason: {
        type: String,
        required: true
    },
    categoriesMateriel: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


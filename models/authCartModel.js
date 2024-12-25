import mongoose , {Schema} from "mongoose";
/*
const cartItemSchema = new Schema({
    id : { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    qty: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true }
}, { _id: false }); 

const authCartSchema = new Schema({
    userId : {
        type : String,
        require : true
    } ,
    cart : {
        type: [cartItemSchema], 
        require : true
    }
})*/
const cartItemSchema = new Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', // Reference to the Product model
        required: true 
    },
    size: { 
        type: String, 
        required: true 
    },  // Store the specific size chosen (e.g., "M", "L")
    qty: { 
        type: Number, 
        required: true 
    } , // Store the quantity selected by the user
    price: {
        type: Number, 
        required: true 
    }
}, { _id: false });

// Define the schema for the guest cart
const authCartSchema = new Schema({
    userId: { 
        type: String, 
        required: true 
    }, // Store session ID or unique identifier for the guest
    cart: { 
        type: [cartItemSchema], 
        required: true 
    }  // Array of cart items
});


export const AuthCart = mongoose.models.AuthCart || mongoose.model('AuthCart',authCartSchema)
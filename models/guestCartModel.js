import mongoose, { Schema } from "mongoose";

// Define the schema for items in the cart
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
    },  // Store the quantity selected by the user
    price: {
        type: Number, 
        required: true 
    }
}, { _id: false });

// Define the schema for the guest cart
const guestCartSchema = new Schema({
    sessionId: { 
        type: String, 
        required: true 
    }, // Store session ID or unique identifier for the guest
    cart: { 
        type: [cartItemSchema], 
        required: true 
    }  // Array of cart items
});

// Create the GuestCart model
export const GuestCart = mongoose.models.GuestCart || mongoose.model('GuestCart', guestCartSchema);

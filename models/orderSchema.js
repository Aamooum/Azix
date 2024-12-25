import mongoose, { Schema } from 'mongoose';




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
const orderSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model for customers
        required: true
    },
    products: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Success', 'Refunded'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Cash on Delivery', 'Bank Transfer','Stripe'],
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});


export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

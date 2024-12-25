import mongoose,{Schema} from "mongoose";



const userSchema = new Schema({
    name: {
        type : String,
        require:true
    },
    email: {
        type : String,
        require:true,
        unique: true
    },
    password: {
        type : String,
        require:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Define roles as needed
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export const User = mongoose.models.User || mongoose.model('User', userSchema);

import { User } from "@models/userModel";
import { dbConnect } from "@utils/mongo";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { GuestCart } from "@models/guestCartModel";
import { AuthCart } from "@models/authCartModel";

async function login(credentials) {
    try {

        await dbConnect();

        
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
            throw new Error("No user found with this email");
        }

      
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const cookieStore = cookies()
        console.log(isMatch,"55555555555555555555555555555555555",cookieStore.get("sessionId").value);
        const sessionId = cookieStore.get("sessionId").value
        if (sessionId) {
            console.log("----------------->");
        
            // Find guest cart based on sessionId
            let getGuestCart = await GuestCart.findOne({ sessionId });
            
            // Make sure guest cart exists
            if (getGuestCart && getGuestCart.cart.length > 0) {
                const userId = user._id;
                let userCart = await AuthCart.findOne({ userId });
        
                // If user doesn't have a cart, create a new one
                if (!userCart) {
                    userCart = new AuthCart({ userId, cart: [] });
                }
        
                // Iterate through guest cart and merge into user cart
                getGuestCart.cart.forEach(guestCartItem => {
                    // Check if the product already exists in the user's cart
                    const existingUserCartItem = userCart.cart.find(
                        userCartItem => userCartItem.product._id.toString() === guestCartItem.product._id.toString() && userCartItem.size === guestCartItem.size
                    );
        
                    if (existingUserCartItem) {
                        // If it exists, update the quantity
                        existingUserCartItem.qty += guestCartItem.qty;
                    } else {
                        // If it doesn't exist, add the item to the user cart
                        userCart.cart.push(guestCartItem);
                    }
                });
        
                // Save the updated user cart
                await userCart.save();
        
                // Clear the guest cart and save the change
                getGuestCart.cart = [];
                await getGuestCart.save();
        
                console.log("Guest cart merged into user cart without duplicates and cleared.");
            } else {
                console.log("No guest cart found or it's empty for this session.");
            }
        }
        
        
        
   
        return user;
    } catch (error) {

        throw new Error("Login failed: " + error.message);
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    throw new Error("Failed to login: " + error.message);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

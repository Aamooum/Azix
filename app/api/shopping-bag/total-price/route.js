import { authorize } from "@utils/authorizeMiddleware";
import { NextResponse } from 'next/server';
import { AuthCart } from "@models/authCartModel";
import { dbConnect } from "@utils/mongo";


export const GET = async (req) => {
    try {
        const { role, token } = await authorize(req);

        if (role !== "User") {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();

        const authCart = await AuthCart.findOne({ userId: token.id })
            .populate('cart.product', 'title price images');

        if (!authCart) {
            return NextResponse.json(
                { totalPrice: 0 },
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const totalPrice = authCart.cart.reduce((total, item) => {
            return total + (item.qty * item.price);
        }, 0);

        return NextResponse.json(
            { totalPrice },
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error("Error in GET User Shopping Bag:", err.message);
        return NextResponse.json(
            { err: 'Internal Server Error' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

import { authorize } from "@utils/authorizeMiddleware"
import { GuestCart } from "@models/guestCartModel"
import { NextResponse } from 'next/server'
import { cookies } from "next/headers"
import { AuthCart } from "@models/authCartModel"
import { dbConnect } from "@utils/mongo"


export const GET = async (req) => {
    const { role, token } = await authorize(req);
    
    await dbConnect();

    if (role === "Guest") {
        const cookieStore = cookies();
        const isSessionExist = cookieStore.has("sessionId");

        if (!isSessionExist) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        try {
            const { value } = cookieStore.get("sessionId");
            const guestCart = await GuestCart.findOne({ sessionId: value })
                .populate('cart.product', 'title price images color');
            
            if (!guestCart) {
                return NextResponse.json({ shoppingBag: [] }, {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return NextResponse.json({ shoppingBag: guestCart.cart }, {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.error("Error in GET Guest Shopping Bag:", err.message);
            return NextResponse.json({ err: 'Internal Server Error' }, {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } else if (role === "User") {
        try {
            const authCart = await AuthCart.findOne({ userId: token.id })
                .populate('cart.product', 'title price images');
            
            if (!authCart) {
                return NextResponse.json({ shoppingBag: [] }, {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return NextResponse.json({ shoppingBag: authCart.cart }, {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.error("Error in GET User Shopping Bag:", err.message);
            return NextResponse.json({ err: 'Internal Server Error' }, {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } else {
        return NextResponse.json({ msg: "Unauthorized access" }, {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export const POST = async (req) => {
    try {
        const { role, token } = await authorize(req);
        await dbConnect();

        if (role === "Guest") {
            return await handleGuestCart(req);
        } else if (role === "User") {
            return await handleUserCart(req, token);
        } else {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        console.error("Error in POST Shopping Bag: ", error.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

const handleGuestCart = async (req) => {
    const cookieStore = cookies();
    const items = await req.json();
    const isSessionExist = cookieStore.has("sessionId");

    if (!isSessionExist) {
        return NextResponse.json(
            { msg: "Session Not Available" },
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
    }

    const session = cookieStore.get("sessionId");
    const sessionUserExist = await GuestCart.findOne({ sessionId: session.value });

    if (!sessionUserExist) {
        await GuestCart.create({ sessionId: session.value, cart: [items] });
        return NextResponse.json(
            { msg: "Created successfully" },
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } else {
        return await updateCart(sessionUserExist, items);
    }
};

const handleUserCart = async (req, token) => {
    const items = await req.json();
    const sessionUserExist = await AuthCart.findOne({ userId: token.id });

    if (!sessionUserExist) {
        await AuthCart.create({ userId: token.id, cart: [items] });
        return NextResponse.json(
            { msg: "Created successfully" },
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } else {
        return await updateCart(sessionUserExist, items);
    }
};

const updateCart = async (sessionUserExist, items) => {
    let itemExists = false;

    sessionUserExist.cart = sessionUserExist.cart.map((item) => {
        if (item.product.toString() === items.product && item.size === items.size) {
            itemExists = true;
            return { ...item, qty: item.qty + 1 }; // Increment quantity
        }
        return item;
    });

    if (!itemExists) {
        sessionUserExist.cart.push(items);
    }

    await sessionUserExist.save();
    return NextResponse.json(
        { msg: "Cart updated successfully" },
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
};


export const PATCH = async (req) => {
    try {
        const { role, token } = await authorize(req);
        await dbConnect();

        if (role === "Guest") {
            return await handleGuestPatch(req);
        } else if (role === "User") {
            return await handleUserPatch(req, token);
        } else {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        console.error("Error in PATCH Shopping Bag: ", error.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

const handleGuestPatch = async (req) => {
    try {
        const cookieStore = cookies();
        const isSessionExist = cookieStore.has("sessionId");

        if (!isSessionExist) {
            return NextResponse.json(
                { msg: "Session Not Available" },
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const sessionId = cookieStore.get("sessionId");
        const { productId, productSize, newQty, price } = await req.json();
        const sessionUserExist = await GuestCart.findOne({ sessionId: sessionId.value });
        
        let productIndex = sessionUserExist.cart.findIndex(data => 
            data.product.toString() === productId && data.size === productSize
        );

        sessionUserExist.cart[productIndex].qty = newQty;
        sessionUserExist.cart[productIndex].price = price * newQty;

        await sessionUserExist.save();

        return NextResponse.json(
            { msg: "Cart updated successfully" },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error in PATCH Shopping Bag for Guest: ", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

const handleUserPatch = async (req, token) => {
    try {
        const { productId, productSize, newQty, price } = await req.json();
        const sessionUserExist = await AuthCart.findOne({ userId: token.id });

        let productIndex = sessionUserExist.cart.findIndex(data => 
            data.product.toString() === productId && data.size === productSize
        );

        sessionUserExist.cart[productIndex].qty = newQty;
        sessionUserExist.cart[productIndex].price = price * newQty;

        await sessionUserExist.save();

        return NextResponse.json(
            { msg: "Cart updated successfully" },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error in PATCH Shopping Bag for User: ", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

export const DELETE = async (req) => {
    try {
        const { role, token } = await authorize(req);
        await dbConnect();

        if (role === "Guest") {
            return await handleGuestDelete(req);
        } else if (role === "User") {
            return await handleUserDelete(req, token);
        } else {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        console.error("Error in DELETE Shopping Bag: ", error.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

const handleGuestDelete = async (req) => {
    try {
        const cookieStore = cookies();
        const isSessionExist = cookieStore.has("sessionId");

        if (!isSessionExist) {
            return NextResponse.json(
                { msg: "Session Not Available" },
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const sessionId = cookieStore.get("sessionId");
        const { productId, productSize } = await req.json();
        const sessionUserExist = await GuestCart.findOne({ sessionId: sessionId.value });
        
        sessionUserExist.cart = sessionUserExist.cart.filter((data) => !(data.product.toString() === productId && data.size === productSize));
        await sessionUserExist.save();

        return NextResponse.json(
            { msg: "Item successfully removed from cart" },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error in DELETE Shopping Bag for Guest: ", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

const handleUserDelete = async (req, token) => {
    try {
        const { productId, productSize } = await req.json();
        const sessionUserExist = await AuthCart.findOne({ userId: token.id });
        
        sessionUserExist.cart = sessionUserExist.cart.filter((data) => !(data.product.toString() === productId && data.size === productSize));
        await sessionUserExist.save();

        return NextResponse.json(
            { msg: "Item successfully removed from cart" },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error in DELETE Shopping Bag for User: ", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

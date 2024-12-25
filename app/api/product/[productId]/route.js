import { Product } from "@models/productModel";
import { authorize } from "@utils/authorizeMiddleware";
import { dbConnect } from "@utils/mongo";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const { role } = await authorize(req);

        if (role !== "User" && role !== "Guest") {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();

        const url = new URL(req.url);
        const productId = url.pathname.split('/').pop(); // Extract productId from URL

        const singleProduct = await Product.findOne({ _id: productId });

        if (!singleProduct) {
            return NextResponse.json(
                { msg: "Product not found" },
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return NextResponse.json(
            singleProduct,
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error("Error in GET Single Product:", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

import { Product } from "@models/productModel";
import { dbConnect } from "@utils/mongo";
import { NextResponse } from "next/server";
import { authorize } from "@utils/authorizeMiddleware";

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
        const productId = url.pathname.split('/').slice(-2)[0];

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return NextResponse.json(
                { msg: "Product not found" },
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const relatedProducts = await Product.find({
            _id: { $ne: product._id },
            categoriesSeason: product.categoriesSeason,
            gender: product.gender,
            categoriesMateriel: { $in: product.categoriesMateriel },
        }).limit(8);

        return NextResponse.json(
            relatedProducts,
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in GET Related Products:", error.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

import { Product } from "@models/productModel";
import { dbConnect } from "@utils/mongo";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await dbConnect();
    try {
        const newArrivals = await Product.find().sort({ date: -1 }).limit(4);
        return NextResponse.json(newArrivals, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        return NextResponse.json(
            { message: "Failed to fetch new arrivals" },
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};

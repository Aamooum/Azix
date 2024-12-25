import { authorize } from "@utils/authorizeMiddleware";
import { Product } from "@models/productModel";
import { NextResponse } from 'next/server';
import { dbConnect } from "@utils/mongo";

export const POST = async (req, res) => {
    try {
        const { role } = await authorize(req);

        if (role !== "Admin") {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();
        const newProduct = await req.json();

        await Product.create(newProduct);

        return NextResponse.json(
            { msg: "New Product Created Successfully." },
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error in POST Product:", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};


export const GET = async (req) => {
    try {
        const { role } = await authorize(req);
        const apiKey = req.headers.get('Authorization');

        if (apiKey !== process.env.API_KEY || !(role === "User" || role === "Guest")) {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();
        const url = new URL(req.url);

        const query = {};
        const page = parseInt(url.searchParams.get('page')) || 1;
        const color = url.searchParams.get('colors');
        const type = url.searchParams.get('types');
        const size = url.searchParams.get('sizes');
        const gender = url.searchParams.get('genders');

        if (color) query.color = { '$in': color.split(',') };
        if (type) query.categoriesSeason = { '$in': type.split(',') };
        if (gender) query.gender = { '$in': gender.split(',') };

        const queryInfo = {
            page,
            size: size ? size.split(',') : [],
        };

        const allProducts = await Product.find(query)
            .skip((page - 1) * 12)
            .limit(12);

        let productsToReturn = allProducts;
        if (queryInfo.size.length > 0) {
            productsToReturn = allProducts.filter(item => {
                const sizeParse = JSON.parse(item.size);
                return queryInfo.size.some(size => sizeParse[size.toLowerCase()] > 0);
            });
        }

        return NextResponse.json(
            productsToReturn,
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (err) {
        console.error("Error in GET Product:", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

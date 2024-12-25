import { authorize } from "@utils/authorizeMiddleware";
import { Product } from "@models/productModel";
import { NextResponse } from 'next/server';
import { dbConnect } from "@utils/mongo";

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

        const allProducts = await Product.find(query);
        let itemsLength = allProducts.length;

        if (queryInfo.size.length > 0) {
            const filteredProductsBySize = allProducts.filter((item) => {
                const sizeParse = JSON.parse(item.size);
                return queryInfo.size.some(size => sizeParse[size.toLowerCase()] > 0);
            });
            itemsLength = filteredProductsBySize.length;
        }

        const data = {
            pages: Math.ceil(itemsLength / 12),
            items: itemsLength,
        };

        return NextResponse.json(data, {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error("Error in GET Status of Product:", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

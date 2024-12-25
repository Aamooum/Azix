import { authorize } from "@utils/authorizeMiddleware";
import { User } from "@models/userModel";
import { NextResponse } from 'next/server';
import { dbConnect } from "@utils/mongo";
import bcrypt from 'bcrypt';

export const POST = async (req) => {
    try {
        const { role } = await authorize(req);

        if (role !== "Guest") {
            return NextResponse.json(
                { msg: "Registration Not Allowed For Signed-in Users." },
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();

        const { name, email, password } = await req.json();
        const hashPassword = await bcrypt.hash(password, 5);

        await User.create({
            name,
            password: hashPassword,
            email
        });

        return NextResponse.json(
            { msg: 'User Account Created Successfully.' },
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error In POST Register:", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

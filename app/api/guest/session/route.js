import { Session } from "@models/sessionModel";
import { authorize } from "@utils/authorizeMiddleware";
import { dbConnect } from "@utils/mongo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const GET = async (req) => {
    try {
        const { role } = await authorize(req);

        if (role !== "Guest") {
            return NextResponse.json(
                { msg: "Unauthorized access" },
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();

        const cookieStore = cookies();
        let sessionId = cookieStore.get('sessionId');

        if (sessionId === undefined) {
            sessionId = uuidv4();
            await Session.create({ sessionId });

            cookieStore.set('sessionId', sessionId, { expires: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000) });

            return NextResponse.json(
                { msg: "Session Successfully Created." },
                { status: 201, headers: { "Content-Type": "application/json" } }
            );
        } else {
            return NextResponse.json(
                { error: "Session Already Exists." },
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (err) {
        console.error("Error in GET Session:", err.message);
        return NextResponse.json(
            { err: "Internal Server Error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

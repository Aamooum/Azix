import { getToken } from "next-auth/jwt";

export async function authorize(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (token?.role === "admin") {
            return { role: "Admin", token: null };
        }

        if (token?.role === "user") {
            return { role: "User", token };
        }

        return { role: "Guest", token: null };
    } catch (error) {
        console.error("Error in authorization:", error);
        return { role: "Guest", token: null };
    }
}

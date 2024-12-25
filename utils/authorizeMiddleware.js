import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { cookies } from 'next/headers'


export async function authorize(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  

    
        if (token?.role === "admin") {
            return { role: "Admin", token: null }
        }

        if (token?.role === "user") {
            return { role: "User", token }
        }

        return { role: "Guest", token: null }
}

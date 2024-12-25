import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'

export function redirect(req) {
    return NextResponse.redirect(new URL('/new', req.url))

}

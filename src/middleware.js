// middleware.ts

import { NextResponse } from "next/server";

export async function middleware(request) {
  // your middleware stuff here
  return NextResponse.next({
    request: {
      headers: new Headers({ "x-url": request.url }),
    },
  });
}
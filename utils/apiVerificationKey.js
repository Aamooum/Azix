import { NextResponse } from 'next/server';

export async function middleware(req) {
  const apiKey = req.headers.get('x-api-key');
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (apiKey !== validApiKey) {
    return NextResponse.json(
      { msg: "Unauthorized access" },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next(); // Proceed if API key is valid
}

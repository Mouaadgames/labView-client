// File: /app/api/echo/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log("api called");

  return NextResponse.json({ text: body.data });
}

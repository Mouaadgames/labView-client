// File: /app/api/echo/route.ts

import { getAISummery } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log("api called");
  const results = await getAISummery(body.id)
  return NextResponse.json({ text: results });
}

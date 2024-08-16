import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { chapter_id: string } }
) {
  console.log(params.chapter_id);

  return new NextResponse("Hello, Next.js! You are on chapter");
}

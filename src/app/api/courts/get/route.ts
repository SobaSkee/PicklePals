import { NextResponse } from "next/server";
import { getCourts } from "@/lib/courts/get";

export async function GET() {
  try {
    const courts = await getCourts();
    return NextResponse.json(courts);
  } catch (error) {
    console.error("GET /api/courts/get error:", error); // this should print in terminal
    return NextResponse.json({ error: "Failed to fetch courts" }, { status: 500 });
  }
}
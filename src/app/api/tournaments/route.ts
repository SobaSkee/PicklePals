import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tournaments = await prisma.tournaments.findMany();
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("GET /api/tournaments error:", error);
    return NextResponse.json({ error: "Unable to fetch tournaments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tournament = await prisma.tournaments.create({
      data: body,
    });
    return NextResponse.json(tournament);
  } catch (error) {
    console.error("POST /api/tournaments error:", error);
    return NextResponse.json({ error: "Unable to create tournament" }, { status: 500 });
  }
}
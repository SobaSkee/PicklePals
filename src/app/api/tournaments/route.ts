import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function GET() {
  try {
    const tournaments = await prisma.tournaments.findMany();
    return NextResponse.json(tournaments);
  } catch (error) {
    console.error("GET /api/tournaments error:", error);
    return NextResponse.json({ error: "Unable to fetch tournaments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await clerkClient.users.getUser(userId);
    const username = user.username || user.firstName || "Anonymous";
    const tournament = await prisma.tournaments.create({
      data: {
        ...body,
        host: username,
        userId,
      },
    });
    return NextResponse.json(tournament);
  } catch (error) {
    console.error("POST /api/tournaments error:", error);
    return NextResponse.json({ error: "Unable to create tournament" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function DELETE(req: Request) {
  // Extract ID from URL path
  const pathname = new URL(req.url).pathname;
  const id = pathname.split('/').pop() || '';
  
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tournament = await prisma.tournaments.findUnique({
    where: { id },
  }) as { userId: string } | null;

  if (!tournament || tournament.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.tournaments.delete({ where: { id } });

  return NextResponse.json({ message: "Tournament deleted successfully" });
}

export async function PATCH(req: Request) {
  // Extract ID from URL path
  const pathname = new URL(req.url).pathname;
  const id = pathname.split('/').pop() || '';
  
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const tournament = await prisma.tournaments.findUnique({
      where: { id },
    });

    if (!tournament) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    const updatedUsers = body.remove
      ? tournament.users.filter((id) => id !== userId)
      : tournament.users.includes(userId)
        ? tournament.users
        : [...tournament.users, userId];

    const updatedTournament = await prisma.tournaments.update({
      where: { id },
      data: {
        users: updatedUsers,
      },
    });

    return NextResponse.json(updatedTournament);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Could not update tournament" }, { status: 500 });
  }
}
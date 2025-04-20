// src/app/api/players/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function GET() {
  try {
    const posts = await prisma.playerPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/players error:", error);
    return NextResponse.json({ error: "Unable to fetch players" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await clerkClient.users.getUser(userId);
    const username = user.username || user.firstName || "Anonymous";

    const body = await req.json() as {
      skill: string;
      preferredCourts: string;
      availability: string;
      description?: string;
      instagram?: string;
    };

    // Check if a post already exists
    const existing = await prisma.playerPost.findFirst({ where: { userId } });

    const post = existing
      ? await prisma.playerPost.update({
          where: { id: existing.id },
          data: {
            skill: body.skill,
            preferredCourts: body.preferredCourts,
            availability: body.availability,
            description: body.description,
            instagram: body.instagram,
          },
        })
      : await prisma.playerPost.create({
          data: {
            skill: body.skill,
            preferredCourts: body.preferredCourts,
            availability: body.availability,
            description: body.description,
            instagram: body.instagram,
            userId,
            username,
          },
        });

    return NextResponse.json(post);
  } catch (error) {
    console.error("POST /api/players error:", error);
    return NextResponse.json({ error: "Unable to create/update post" }, { status: 500 });
  }
}
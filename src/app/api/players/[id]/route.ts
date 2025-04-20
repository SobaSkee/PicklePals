export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const pathname = new URL(req.url).pathname;
  const id = pathname.split('/').pop() || '';

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await prisma.playerPost.findUnique({ where: { id } });
    if (!post || post.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.playerPost.delete({ where: { id } });
    return NextResponse.json({ message: "Post deleted" });
  } catch (err) {
    console.error("DELETE /api/players/[id] error:", err);
    return NextResponse.json({ error: "Unable to delete post" }, { status: 500 });
  }
}
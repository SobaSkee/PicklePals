export const dynamic = "force-dynamic";

import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the ID from the URL path directly
    const pathname = new URL(request.url).pathname;
    const id = pathname.split('/').pop() || '';
    
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(id);
    
    return NextResponse.json({ 
      username: user.username || user.firstName || "Anonymous" 
    });
  } catch (err) {
    return NextResponse.json({ username: "Unknown" });
  }
}
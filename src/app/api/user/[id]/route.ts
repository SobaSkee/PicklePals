export const dynamic = "force-dynamic";

import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the ID from the URL path directly
    const pathname = new URL(request.url).pathname;
    const id = pathname.split('/').pop() || '';
    
    const user = await clerkClient.users.getUser(id);
    
    return NextResponse.json({ 
      username: user.username || user.firstName || "Anonymous",
      email: user.emailAddresses?.[0]?.emailAddress || ""
    });
  } catch (err) {
    return NextResponse.json({ username: "Unknown", email: "" });
  }
}
import { NextResponse } from "next/server";
import { createCourt } from "@/lib/courts/create";

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
  
      const name = formData.get("name") as string;
      const lat = parseFloat(formData.get("lat") as string);
      const lng = parseFloat(formData.get("lng") as string);
      const address = formData.get("address") as string;
      const isPublic = formData.get("isPublic") === "true";
      const description = formData.get("description") as string;
      const imageFile = formData.get("image") as File;
  
      let image = "";
      if (imageFile) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        image = buffer.toString("base64");
      }
  
      const newCourt = await createCourt({
        name,
        lat,
        lng,
        address,
        isPublic: isPublic,
        description,
        image, // now a base64 string
      });
  
      return NextResponse.json({ success: true, court: newCourt });
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
  }
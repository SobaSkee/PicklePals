import prisma from "../prisma";

export async function getCourts() {
    try {
      console.log("➡️ Fetching courts...");
      const courts = await prisma.courts.findMany();
      console.log("✅ Courts found:", courts.length);
      return courts;
    } catch (error: any) {
        console.error("🔥 Error fetching courts:", error.message);
        console.error("🪵 Full stack trace:", error);
        throw error;
      }
  }
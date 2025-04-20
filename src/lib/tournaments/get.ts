import prisma from "../prisma";

export async function getTournaments() {
    try {
      console.log("➡️ Fetching tournaments...");
      const tournaments = await prisma.tournaments.findMany();
      console.log("✅ Tournaments found:", tournaments.length);
      return tournaments;
    } catch (error: any) {
        console.error("🔥 Error fetching tournaments:", error.message);
        console.error("🪵 Full stack trace:", error);
        throw error;
      }
  }
// lib/courts.ts
import prisma from "./prisma";

// function to fetch all courts
export async function getCourts() {
  try {
    const courts = await prisma.courts.findMany();
    return courts;
  } catch (error) {
    console.error("Error fetching courts:", error);
    throw error;
  }
}

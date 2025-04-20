import prisma from "../prisma";

interface TournamentData {
  name: string;
  court: string;
  users: Array<string>;
  host: string;
  maxSize: number
  description: string;
}

export async function createTournament(data: TournamentData) {
  try {
    const tournament = await prisma.courts.create({
      data: {
        name: data.name,
        court: data.court,
        users: data.users,
        maxSize: data.maxSize,
        description: data.description
      },
    });
    return tournament;
  } catch (error) {
    console.error("Error creating tournament:", error);
    throw error;
  }
}

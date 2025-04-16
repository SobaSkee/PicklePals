import prisma from "../prisma";

interface CourtData {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isPublic: boolean;
  description: string;
  image: string;
}

export async function createCourt(data: CourtData) {
  try {
    const court = await prisma.courts.create({
      data: {
        name: data.name,
        lat: data.lat,
        lng: data.lng,
        address: data.address,
        isPublic: data.isPublic,
        description: data.description,
        image: data.image,
      },
    });
    return court;
  } catch (error) {
    console.error("Error creating court:", error);
    throw error;
  }
}

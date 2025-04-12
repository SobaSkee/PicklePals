// src/pages/api/courts.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getCourts } from "@/lib/courts"; // import the function from lib/courts.ts

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const courts = await getCourts(); // fetch courts from the database
      res.status(200).json(courts);
    } catch (error) {
      console.error("Error fetching courts:", error);
      res.status(500).json({ error: "Error fetching courts" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

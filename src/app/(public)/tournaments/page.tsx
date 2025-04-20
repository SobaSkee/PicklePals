// test page for looking at tournaments
import React from "react";
import prisma from "@/lib/prisma";

async function Page() {
  const tournaments = await prisma.tournaments.findMany();
  return (
    <div className="pt-16">
      <p>Tournaments:</p>
      {JSON.stringify(tournaments)}
    </div>
  );
}

export default Page;

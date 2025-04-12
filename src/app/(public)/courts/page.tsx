// this page is test displaying court data from database
import React from "react";
import prisma from "@/lib/prisma";

async function Page() {
  const courts = await prisma.courts.findMany();
  return (
    <div className="pt-16">
      <p>Courts:</p>
      {JSON.stringify(courts)}
    </div>
  );
}

export default Page;

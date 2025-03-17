// this page is test displaying user data from database
import React from "react";
import prisma from "@/lib/prisma";

async function Page() {
  const users = await prisma.user.findMany();
  return (
    <div className="pt-16">
      <p>Users:</p>
      {JSON.stringify(users)}
    </div>
  );
}

export default Page;

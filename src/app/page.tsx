import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col gap-2 items-center justify-center my-10">
      <h1>Landing Page</h1>
      {/* aschild styles the clerk button using shadcn styles */}
      <Button asChild>
        <SignInButton />
      </Button>
      <Button asChild>
        <SignUpButton />
      </Button>
      <UserButton />

      <p>Users:</p>
      {JSON.stringify(users)}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center my-10">
      <h1>Home Page</h1>
      {/* aschild styles the clerk button using shadcn styles */}
      <Button asChild>
        <SignInButton />
      </Button>
      <Button asChild>
        <SignUpButton />
      </Button>
      <UserButton />
    </div>
  );
}

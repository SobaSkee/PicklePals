"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import pickleballLogo2 from "@/../public/pickleball-logo-2.svg";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky inset-0 bg-[#01A7FF] px-4 z-40 h-16 w-full flex justify-between">
      <div className="flex h-16 items-center justify-between w-full max-w-screen-2xl mx-auto py-4 px-4">
        <Link href="/" className="flex items-center justify-center gap-2">
          <span className="text-3xl text-white font-bold">PicklePals</span>
          <Image
            src={pickleballLogo2}
            width={55}
            height={55}
            alt="logo"
            className="rounded-full"
          ></Image>
        </Link>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-base">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-2 ml-auto">
          {!isSignedIn && (
            <>
              <Button
                className="bg-[#c0ff18] hover:bg-[#c0ff18]/95 text-black"
                asChild
              >
                <SignUpButton />
              </Button>
              <Button variant="ghost" className="text-white" asChild>
                <SignInButton />
              </Button>
            </>
          )}
          {isSignedIn && <UserButton />}
        </nav>
      </div>
    </header>
  );
}

export default Header;

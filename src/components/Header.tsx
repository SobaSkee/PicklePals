"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import pickleballLogo2 from "@/../public/pickleball-logo-2.svg";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
<header className="sticky inset-0 bg-[#01A7FF] z-40 w-full">
  <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto h-16 px-4">
        <Link href="/" className="flex items-center justify-center gap-2">
          <span className="text-3xl text-white font-bold">PicklePals</span>
          <Image
            src={pickleballLogo2}
            width={55}
            height={55}
            alt="logo"
            className="rounded-full"
          />
        </Link>
        <div className="hidden md:flex items-center gap-6 ml-6">
          <Link href="/map" className="text-white hover:underline text-md font-medium">
            Courts
          </Link>
          <Link href="/tournaments" className="text-white hover:underline text-md font-medium">
            Tournaments
          </Link>
          <Link href="/players" className="text-white hover:underline text-md font-medium">
            Players
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-base"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4 ml-auto">
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
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#01A7FF] text-white px-6 py-4 z-30 shadow-md space-y-4">
          <Link href="/map" onClick={() => setMobileOpen(false)} className="block hover:underline">Courts</Link>
          <Link href="/tournaments" onClick={() => setMobileOpen(false)} className="block hover:underline">Tournaments</Link>
          <Link href="/players" onClick={() => setMobileOpen(false)} className="block hover:underline">Players</Link>
          {!isSignedIn ? (
            <>
              <div className="pt-2">
                <SignUpButton />
              </div>
              <div>
                <SignInButton />
              </div>
            </>
          ) : (
            <div className="pt-2">
              <UserButton />
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;

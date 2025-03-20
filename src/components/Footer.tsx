import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t md:py-0 px-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PicklePals. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
        <nav className="flex gap-4 md:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

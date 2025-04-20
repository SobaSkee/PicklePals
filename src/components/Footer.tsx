import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full border-t md:py-0 px-10">
      <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-center h-16 px-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PicklePals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

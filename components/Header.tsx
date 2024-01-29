"use client";

import Link from "next/link";
import React from "react";
import { WalletConnect } from "./WalletConnect";
import { ModeToggle } from "./ColorModeToggle";

function NavItems() {
  return (
    <nav className="flex items-center  space-x-4 lg:space-x-6">
      <Link
        href={"/"}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        IDL
      </Link>
      <Link
        href={"/"}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Accounts
      </Link>
      <Link
        href={"/"}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Instructions
      </Link>
    </nav>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between w-full px-6 border-b lg:space-x-6 py-4">
      <Link href={"/"}>
        <p className="text-lg font-mono font-semibold text-blue-700">
          Anchor UI
        </p>
      </Link>
      <NavItems />
      <div className="flex flex-row items-center space-x-4">
        {/* Add a Component similar to the Jupiter website to change ENVs and RPC
        Urls */}
        <ModeToggle />
        <WalletConnect />
      </div>
    </div>
  );
}

export default Header;

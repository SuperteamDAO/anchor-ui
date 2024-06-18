import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ColorModeToggle";
import { SettingsBtn } from "./SettingsBtn";
import { WalletConnect } from "./WalletConnect";

function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <div className="ml-auto gap-1.5 flex flex-row items-center justify-around">
        <ModeToggle />
        <SettingsBtn />
        <WalletConnect />
      </div>
    </header>
  );
}

export default Header;

import * as React from "react";
import Link from "next/link";
import { MobileNav } from "src/components/mobile-nav";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { GrFormClose } from "react-icons/gr";
import { signIn, signOut, useSession } from "next-auth/react";

export function MainNav() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <>
      <div className="flex justify-between gap-6 px-10 py-5 md:gap-10">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Image src="/logo.png" width={32} height={32} alt="Logo" />
          <span className="hidden font-bold sm:inline-block">Aido</span>
        </Link>

        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <GrFormClose />
          ) : (
            <Image src="/logo.png" width={32} height={32} alt="Logo" />
          )}
          <span className="font-bold">Menu</span>
        </button>
        <div className="flex items-center space-x-5">
          <Button onClick={session ? () => signOut() : () => signIn("google")}>
            {session ? "Sign Out" : "Sign In"}
          </Button>
          <ModeToggle />
        </div>
        {showMobileMenu && <MobileNav />}
      </div>
      <div className="h-[1px] bg-[#F8515E]"></div>
    </>
  );
}

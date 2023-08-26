import * as React from "react";
import Link from "next/link";
import { MobileNav } from "src/components/mobile-nav";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { GrFormClose } from "react-icons/gr";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, Menu } from "lucide-react";

export function MainNav() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <>
      <div className="flex justify-between gap-6 px-10 py-3 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" width={32} height={32} alt="Logo" />
          <span className="font-bold sm:inline-block">Aido</span>
        </Link>

        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <GrFormClose className="h-5 w-5" /> : <Menu />}
        </button>
        <div className="hidden items-center space-x-5 md:flex">
          <Button onClick={session ? () => signOut() : () => signIn("google")}>
            {session ? "Sign Out" : "Sign In"}
            {session ? (
              <LogIn className="ml-2" size={18} />
            ) : (
              <LogOut className="ml-2" size={18} />
            )}
          </Button>
          <ModeToggle />
        </div>
        {showMobileMenu && <MobileNav session={session} />}
      </div>
      <div className="h-[1px] bg-[#F8515E]"></div>
    </>
  );
}

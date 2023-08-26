import * as React from "react";
import Link from "next/link";
import { cn } from "src/lib/utils";
import { useLockBody } from "src/hooks/use-lock-body";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export function MobileNav({ session }: { session: Session | null }) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" width={32} height={32} alt="Logo" />
          <span className="font-bold">Aido</span>
        </Link>
        <div className="flex space-x-2 items-center justify-start">
          <Button className="w-fit" onClick={session ? () => signOut() : () => signIn("google")}>
            {session ? "Sign Out" : "Sign In"}
            {session ? (
              <LogIn className="ml-2" size={18} />
            ) : (
              <LogOut className="ml-2" size={18} />
            )}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

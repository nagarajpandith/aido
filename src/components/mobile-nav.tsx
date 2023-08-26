import * as React from "react";
import Link from "next/link";
import { cn } from "src/lib/utils";
import { useLockBody } from "src/hooks/use-lock-body";
import Image from "next/image";

export function MobileNav() {
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
      </div>
    </div>
  );
}

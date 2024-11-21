"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

const links = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "/transactions",
    label: "Transações",
  },
  {
    href: "/subscription",
    label: "Assinatura",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden justify-between border-b border-solid px-8 py-4 sm:flex">
        <div className="flex items-center gap-10">
          <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "font-bold text-primary"
                  : "text-muted-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <UserButton showName />
      </div>

      <div className="flex justify-between px-8 py-4 sm:hidden">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <Sheet>
          <SheetTrigger className="p-4">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="pb-6">
              <SheetTitle>
                <Image
                  src="/logo.svg"
                  width={173}
                  height={39}
                  alt="Finance AI"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="items-left flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "font-bold text-primary"
                      : "text-muted-foreground"
                  }
                >
                  {link.label}
                </Link>
              ))}
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: "flex-row-reverse",
                    userButtonPopoverCard: { pointerEvents: "initial" },
                  },
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

// @ts-nocheck
import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { cn } from "@/lib";
import { useSidebarToggle, useStore } from "@/hooks";
import Image from "next/image";
export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state: any) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "lg:block fixed top-0 hidden  left-0 z-20 h-screen max-w-[285px] bg-white dark:bg-black200 translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <div
          className={cn(
            "transition-transform px-3 ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/images/brain-hi.png"
              height={20}
              width={20}
              alt="Mind Luxe Ai logo"
              className="mb-1x h-7 w-fit"
            />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Mind Luxe Ai
            </h1>
          </Link>
        </div>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { Ellipsis, LogOut, LayoutGridIcon, Users, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib";
import { getMenuList } from "@/lib/menu-list";

interface MenuProps {
  isOpen: boolean | undefined;
}

const ADMIN_MENU_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutGridIcon
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users
  },
  {
    label: "Billings",
    href: "/dashboard/admin/billing",
    icon: Users
  },
  {
    label: "Blogs",
    href: "/dashboard/admin/Blogs",
    icon: Users
  },
<<<<<<< HEAD

=======
  {
    label: "Health Materials",
    href: "/dashboard/admin/health-Materials",
    icon: Users
  },
>>>>>>> 852510b1f934348e3d82706f00af2b31dd2f6e7f
  {
    label: "Settings",
    href: "/dashboard/account/settings",
    icon: SettingsIcon
  }
];

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const menuList = getMenuList(pathname);
  

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const response = await fetch('/api/check-admin');
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Show loading state while checking admin status
  if (isAdmin === null) {
    return (
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-8 h-full w-full">
          <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(98vh-32px-40px-32px)] items-start space-y-1 px-2">
            <li className="w-full">
              <div className="w-full h-10 mb-1 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" />
            </li>
          </ul>
        </nav>
      </ScrollArea>
    );
  }

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const response = await fetch('/api/check-admin');
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Show loading state while checking admin status
  if (isAdmin === null) {
    return (
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-8 h-full w-full">
          <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(98vh-32px-40px-32px)] items-start space-y-1 px-2">
            <li className="w-full">
              <div className="w-full h-10 mb-1 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" />
            </li>
          </ul>
        </nav>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(98vh-32px-40px-32px)] items-start space-y-1 px-2">
          {isAdmin ? (
            // Render admin menu items
            ADMIN_MENU_ITEMS.map(({ href, label, icon: Icon }, index) => {
              const isActive = pathname === href;
              return (
                <li className="w-full" key={index}>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className="w-full justify-start dark:hover:bg-black300 font-semibold capitalize dark:text-gray-100 text-gray-800 h-10 mb-1"
                          asChild
                        >
                          <Link href={href}>
                            <span className={cn(isOpen === false ? "" : "mr-4")}>
                              <Icon size={18} />
                            </span>
                            <p
                              className={cn(
                                "max-w-[200px]",
                                isOpen === false
                                  ? "-translate-x-96 opacity-0"
                                  : "translate-x-0 opacity-100"
                              )}
                            >
                              {label}
                            </p>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      {isOpen === false && (
                        <TooltipContent side="right">{label}</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              );
            })
          ) : (
            menuList.map(({ groupLabel, menus }, index) => (
              <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
                {(isOpen && groupLabel) || isOpen === undefined ? (
                  <p className="text-sm flex justify-center items-center gap-2 font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                    {groupLabel}{" "}
                    <div className="w-full h-[1px] bg-slate-400"> </div>
                  </p>
                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"> </p>
                )}
                {menus.map(
                  ({ href, label, icon: Icon, active, submenus }, index) =>
                    submenus.length === 0 ? (
                      <div className="w-full" key={index}>
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={active ? "secondary" : "ghost"}
                                className="w-full justify-start dark:hover:bg-black300 font-semibold capitalize dark:text-gray-100 text-gray-800 h-10 mb-1"
                                asChild
                              >
                                <Link href={href}>
                                  <span
                                    className={cn(isOpen === false ? "" : "mr-4")}
                                  >
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      "max-w-[200px]",
                                      isOpen === false
                                        ? "-translate-x-96 opacity-0"
                                        : "translate-x-0 opacity-100"
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {isOpen === false && (
                              <TooltipContent side="right">
                                {label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : null
                )}
              </li>
            ))
          )}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="secondaryOutline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}

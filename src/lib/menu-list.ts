import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

import { BotIcon, SettingsIcon, HeartPulseIcon, LayoutGridIcon, NotepadTextIcon, StethoscopeIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};






export const LINKS = [
 
 


  // {
     
  //     icon: SettingsIcon,
  // }
] as const;

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon:LayoutGridIcon ,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [

        
        {
          href: "/dashboard/health-status",
          label: "Health Status",
          active: pathname.includes("/dashboard/health-status"),
          icon: HeartPulseIcon ,
          submenus: [
            {
              href: "/posts",
              label: "All Posts",
              active: pathname === "/posts"
            },
            {
              href: "/posts/new",
              label: "New Post",
              active: pathname === "/posts/new"
            }
          ]
        },
        {
          href: "/dashboard/health-tips",
          label: "Health Tips",
          active: pathname.includes("/dashboard/health-tips"),
          icon:  NotepadTextIcon ,
          submenus: []
        },
        {
          href: "/dashboard/summary",
          label: "Summary",
          active: pathname.includes("/dashboard/summary"),
          icon: StethoscopeIcon ,
          submenus: []
        },
        {
          href: "/dashboard/ai",
          label: "AI Chat",
          active: pathname.includes("/dashboard/ai"),
          icon: BotIcon,
          submenus: []
        },
        {
          href: "/dashboard/advice",
          label: "Advice",
          active: pathname.includes("/dashboard/advice"),
          icon: BotIcon,
          submenus: []
        },
        
      ],
    
      
    },
    {
      groupLabel: "Settings",
      menus: [
        // {
        //   href: "/users",
        //   label: "Users",
        //   active: pathname.includes("/users"),
        //   icon: Users,
        //   submenus: []
        // },


        {
          href: "/dashboard/account/settings" ,
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }

        
        
      ]
    }
  ];
}

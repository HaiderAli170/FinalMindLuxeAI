import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  File ,
  LucideIcon,
  Info,
  Book
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





export const posts = [
  {
    title: 'Understanding Mental Health',
    url: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    image: "brainHeart",
    subTitle: "Mental health is the state of a person's emotional and psychological well-being.",
  },
  {
    title: 'Importance Of Mental Health',
    url: 'https://www.verywellmind.com/the-importance-of-mental-health-for-wellbeing-5207938',
    image: "yellowSmiles",
    subTitle: "Mental health is essential for overall well-being and affects emotions and behaviors.",
  },
  {
    title: 'Common Mental Health Disorders',
    url: 'https://www.betterhealth.vic.gov.au/health/servicesandsupport/types-of-mental-health-issues-and-illnesses',
    image: "mentalHealthMatters",
    subTitle: "Common mental health disorders affect a person's emotional and psychological state.",
  },
  {
    title: 'Mindfulness And Meditation',
    url: 'https://www.verywellmind.com/mindfulness-meditation-88369',
    image: "meditation",
    subTitle: 'Mindfulness is being present, while meditation helps increase inner peace.',
  },
  {
    title: 'Suicide Prevention',
    url: 'https://www.nimh.nih.gov/health/topics/suicide-prevention',
    image: "billBoards",
    subTitle: 'Suicide prevention involves awareness, education, and support.',
  },
  {
    title: 'What Is Depression?',
    url: 'https://www.psychiatry.org/patients-families/depression/what-is-depression',
    image: "thinkingGirl",
    subTitle: 'Depression is a disorder characterized by persistent sadness and hopelessness.',
  },
];

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
          href: "/dashboard/blogs",
          label: "Blogs",
          active: pathname.includes("/dashboard/blogs"),
          icon:File ,
          submenus: []
        },
        {
          href: "/dashboard/articles",
          label: "Articles",
          active: pathname.includes("/dashboard/articles"),
          icon:File ,
          submenus: []
        },
        {
          href: "/dashboard/advice",
          label: "Advice",
          active: pathname.includes("/dashboard/advice"),
          icon: Info ,
          submenus: []
        },
        
        {
          href: "/dashboard/techniques",
          label: "Techniques",
          active: pathname.includes("/dashboard/techniques"),
          icon: Book  ,
          submenus: []
        },
        
      ],
    
      
    },
    {
      groupLabel: "Settings",
      menus: [
        // {
        //   href: "/dashboard/users",
        //   label: "Users",
        //   active: pathname.includes("/dashboard/users"),
        //   icon: Users,
        //   submenus: []
        // },


        {
          href: "/dashboard/account" ,
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }

        
        
      ]
    }
  ];
}

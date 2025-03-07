import { BotIcon, SettingsIcon, HeartPulseIcon, LayoutGridIcon, NotepadTextIcon, StethoscopeIcon } from "lucide-react";

export const LINKS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutGridIcon,
    },
    {
        label: "Health Status",
        href: "/dashboard/health-status",
        icon: HeartPulseIcon,
    },
    {
        label: "Health Tips",
        href: "/dashboard/health-tips",
        icon: NotepadTextIcon,
    },
    {
        label: "Blogs",
        href: "/dashboard/blogs",
        icon: NotepadTextIcon,
    },
    {
        label: "Summary",
        href: "/dashboard/summary",
        icon: StethoscopeIcon,
    },
    {
        label: "AI Chat",
        href: "/dashboard/ai",
        icon: BotIcon,
    },
    {
        label: "Advice",
        href: "/dashboard/advice",
        icon: BotIcon,
    },
    {
        label: "Settings",
        href: "/dashboard/account/settings",
        icon: SettingsIcon,
    }
] as const;

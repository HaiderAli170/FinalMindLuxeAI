import {
  HeartHandshakeIcon,
  HeartPulseIcon,
  LucideIcon,
  PillIcon,
  UserIcon,
  MessageCircle ,
  WandSparklesIcon,
  VideoIcon,
  BookOpenIcon,
  
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  info: string;
};

export const FEATURES: Feature[] = [
  {
    icon: UserIcon,
    title: "Personalized Profiles",
    info: "Create and manage your personal and mental health profile with ease.",
  },
  {
    icon: MessageCircle,
    title: "24/7 Chatbot Availability",
    info: "Get emotional support and guidance at any time through the AI-powered chatbot, available 24/7.",
  },
  {
    icon: PillIcon,
    title: "Meditation and Relaxation",
    info: "Access guided meditation sessions, breathing exercises, and relaxation techniques to manage stress and anxiety.",
  },
  {
    icon: HeartPulseIcon,
    title: "Health Analytics",
    info: "Get detailed insights into your health trends over time.",
  },
  {
    icon: BookOpenIcon, // Replace with the appropriate icon for a resource library
    title: "Resource Library",
    info: "Explore research articles and books to deepen your understanding of mental health and wellness.",
  },
  {
    icon: VideoIcon,
    title: "Mental Health Videos and Pictures",
    info: "Watch supportive mental health videos and view inspirational pictures to improve your well-being.",
  },
];

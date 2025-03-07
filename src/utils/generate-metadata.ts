import { Metadata } from "next";

export const generateMetadata = ({
    title = `${process.env.NEXT_PUBLIC_APP_NAME} - Your Personal Health Assistant`,
    description = `${process.env.NEXT_PUBLIC_APP_NAME} is a comprehensive virtual health coach platform that leverages AI to provide personalized health and wellness recommendations.`,
    image = "/images/brain-hi.png",
    icons = [
        {
            rel: "icon",
            sizes: "700x700",
            url: "/images/brain-hi.png",
        },
        {
            rel: "manifest",
            sizes: "512x512",
            url: "/images/brain-hi.png",
        },
    ],
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: {
        rel: string;
        sizes: string;
        url: string;
    }[];
    noIndex?: boolean;
} = {}): Metadata => ({
    title: title,
    description: description,
    icons: icons,
    openGraph: {
        title,
        description,
        ...(image && { images: [{ url: image }] }),
    },
});

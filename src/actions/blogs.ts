"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

interface BlogProps {
    name: string;
    url: string;
    image: string;
    description: string;
}

// Create a new blog
const createBlog = async ({ name, url, image, description }: BlogProps) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    if (!name || !url || !image || !description) {
        throw new Error("Missing required fields");
    }

    try {
        await db.blog.create({
            data: {
                name,
                url,
                image,
                description,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    } catch (error) {
        console.error("Error creating blog", error);
        throw new Error("Error creating blog");
    }
};

// Update an existing blog
const updateBlog = async (id: string, { name, url, image, description }: BlogProps) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    if (!id || !name || !url || !image || !description) {
        throw new Error("Missing required fields");
    }

    try {
        const blog = await db.blog.update({
            where: { id },
            data: {
                name,
                url,
                image,
                description,
                updatedAt: new Date(),
            },
        });
        return blog;
    } catch (error) {
        console.error("Error updating blog", error);
        throw new Error("Error updating blog");
    }
};

// Delete an existing blog
const deleteBlog = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    if (!id) {
        throw new Error("Blog ID is required");
    }

    try {
        await db.blog.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting blog", error);
        throw new Error("Error deleting blog");
    }
};

export { createBlog, updateBlog, deleteBlog };

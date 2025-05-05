"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

// Get all blogs
const getBlogs = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    try {
        const blogs = await db.blog.findMany();
        return blogs;
    } catch (error) {
        console.error("Error retrieving blogs", error);
        throw new Error("Error retrieving blogs");
    }
};

// Get a specific blog by id
const getBlogById = async (id: string) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    if (!id) {
        throw new Error("Blog ID is required");
    }

    try {
        const blog = await db.blog.findUnique({
            where: { id },
        });

        if (!blog) {
            throw new Error("Blog not found");
        }

        return blog;
    } catch (error) {
        console.error("Error retrieving blog", error);
        throw new Error("Error retrieving blog");
    }
};

export { getBlogs, getBlogById };

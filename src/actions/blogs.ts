"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

interface BlogProps {
<<<<<<< HEAD
  title: string;
  author?: string;
  publishedDate?: string;
  readTime?: string;
  description: string;
  content?: string;
  imageUrl: string;
  category?: string;
  blogUrl: string;
}

interface MentalIllnessProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

// Get all blogs
export const getBlogs = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  try {
    const blogs = await db.blog.findMany();
    return blogs;
  } catch (error) {
    console.error("Error retrieving blogs", error);
    throw new Error("Error retrieving blogs");
  }
};

// Get a specific blog by ID
export const getBlogById = async (id: string) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  if (!id) throw new Error("Blog ID is required");
  try {
    const blog = await db.blog.findUnique({ where: { id } });
    if (!blog) throw new Error("Blog not found");
    return blog;
  } catch (error) {
    console.error("Error retrieving blog", error);
    throw new Error("Error retrieving blog");
  }
};

// Create a new blog (Admin only)
export const createBlog = async ({
  title,
  author,
  publishedDate,
  readTime,
  description,
  content,
  imageUrl,
  category,
  blogUrl,
}: BlogProps) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("You must be an admin to perform this action");
  if (!title || !description || !imageUrl || !blogUrl) throw new Error("Missing required fields");
  try {
    const blog = await db.blog.create({
      data: {
        title,
        author,
        publishedDate,
        readTime,
        description,
        content,
        imageUrl,
        category,
        blogUrl,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error creating blog", error);
    throw new Error("Error creating blog");
  }
};

// Update an existing blog (Admin only)
export const updateBlog = async (
  id: string,
  { title, author, publishedDate, readTime, description, content, imageUrl, category, blogUrl }: BlogProps
) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("You must be an admin to perform this action");
  if (!id || !title || !description || !imageUrl || !blogUrl) throw new Error("Missing required fields");
  try {
    const blog = await db.blog.update({
      where: { id },
      data: {
        title,
        author,
        publishedDate,
        readTime,
        description,
        content,
        imageUrl,
        category,
        blogUrl,
        updatedAt: new Date(),
      },
    });
    return blog;
  } catch (error) {
    console.error("Error updating blog", error);
    throw new Error("Error updating blog");
  }
};

// Delete an existing blog (Admin only)
export const deleteBlog = async (id: string) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("You must be an admin to perform this action");
  if (!id) throw new Error("Blog ID is required");
  try {
    await db.blog.delete({ where: { id } });
    return { message: "Blog deleted successfully" };
  } catch (error) {
    console.error("Error deleting blog", error);
    throw new Error("Error deleting blog");
  }
};

// Get all mental illnesses
export const getMentalIllnesses = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  try {
    const illnesses = await db.mentalIllness.findMany();
    return illnesses;
  } catch (error) {
    console.error("Error retrieving mental illnesses", error);
    throw new Error("Error retrieving mental illnesses");
  }
};

// Get a specific mental illness by ID
export const getMentalIllnessById = async (id: string) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  if (!id) throw new Error("Mental Illness ID is required");
  try {
    const illness = await db.mentalIllness.findUnique({ where: { id } });
    if (!illness) throw new Error("Mental Illness not found");
    return illness;
  } catch (error) {
    console.error("Error retrieving mental illness", error);
    throw new Error("Error retrieving mental illness");
  }
};

// Create a new mental illness (Admin only)
export const createMentalIllness = async ({ title, description, image, link }: MentalIllnessProps) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("You must be an admin to perform this action");
  if (!title || !description || !image || !link) throw new Error("Missing required fields");
  try {
    const illness = await db.mentalIllness.create({
      data: {
        title,
        description,
        image,
        link,
      },
    });
    return illness;
  } catch (error) {
    console.error("Error creating mental illness", error);
    throw new Error("Error creating mental illness");
  }
};

// Update an existing mental illness (Admin only)
export const updateMentalIllness = async (
  id: string,
  { title, description, image, link }: MentalIllnessProps
) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("You must be an admin to perform this action");
  if (!id || !title || !description || !image || !link) throw new Error("Missing required fields");
  try {
    const illness = await db.mentalIllness.update({
      where: { id },
      data: {
        title,
        description,
        image,
        link,
        updatedAt: new Date(),
      },
    });
    return illness;
  } catch (error) {
    console.error("Error updating mental illness", error);
    throw new Error("Error updating mental illness");
  }
};

// Delete an existing mental illness (Admin only)
export const deleteMentalIllness = async (id: string) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  const dbUser = await db.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("You must be an admin to perform this action");
  if (!id) throw new Error("Mental Illness ID is required");
  try {
    await db.mentalIllness.delete({ where: { id } });
    return { message: "Mental Illness deleted successfully" };
  } catch (error) {
    console.error("Error deleting mental illness", error);
    throw new Error("Error deleting mental illness");
  }
};
=======
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
>>>>>>> 852510b1f934348e3d82706f00af2b31dd2f6e7f

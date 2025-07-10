"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

// ----------- Book Functions -----------

// Add a new book
const createBook = async ({ title, author, url, description, image }: { title: string, author: string, url: string, description: string, image: string }) => {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }
  
  if (!title || !author || !url || !description || !image) {
    throw new Error("Missing required fields");
  }

  try {
    const newBook = await db.book.create({
      data: {
        title,
        author,
        url,
        description,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return newBook;
  } catch (error) {
    console.error("Error creating book", error);
    throw new Error("Error creating book");
  }
};

// Update an existing book
const updateBook = async (id: string, { title, author, url, description, image }: { title: string, author: string, url: string, description: string, image: string }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id || !title || !author || !url || !description || !image) {
    throw new Error("Missing required fields");
  }

  try {
    const updatedBook = await db.book.update({
      where: { id },
      data: {
        title,
        author,
        url,
        description,
        image,
        updatedAt: new Date(),
      },
    });
    return updatedBook;
  } catch (error) {
    console.error("Error updating book", error);
    throw new Error("Error updating book");
  }
};

// Delete an existing book
const deleteBook = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id) {
    throw new Error("Book ID is required");
  }

  try {
    await db.book.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting book", error);
    throw new Error("Error deleting book");
  }
};

// Get all books
const getBooks = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  try {
    const books = await db.book.findMany();
    return books;
  } catch (error) {
    console.error("Error retrieving books", error);
    throw new Error("Error retrieving books");
  }
};

// Get a single book by ID
const getBookById = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id) {
    throw new Error("Book ID is required");
  }

  try {
    const book = await db.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  } catch (error) {
    console.error("Error retrieving book", error);
    throw new Error("Error retrieving book");
  }
};

// ----------- TechNews Functions -----------

// Add new tech news
const createTechNews = async ({ name, url, gif }: { name: string, url: string, gif: string }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!name || !url || !gif) {
    throw new Error("Missing required fields");
  }

  try {
    const newTechNews = await db.techNews.create({
      data: {
        name,
        url,
        gif,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return newTechNews;
  } catch (error) {
    console.error("Error creating tech news", error);
    throw new Error("Error creating tech news");
  }
};

// Update existing tech news
const updateTechNews = async (id: string, { name, url, gif }: { name: string, url: string, gif: string }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id || !name || !url || !gif) {
    throw new Error("Missing required fields");
  }

  try {
    const updatedTechNews = await db.techNews.update({
      where: { id },
      data: {
        name,
        url,
        gif,
        updatedAt: new Date(),
      },
    });
    return updatedTechNews;
  } catch (error) {
    console.error("Error updating tech news", error);
    throw new Error("Error updating tech news");
  }
};

// Delete existing tech news
const deleteTechNews = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id) {
    throw new Error("Tech News ID is required");
  }

  try {
    await db.techNews.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting tech news", error);
    throw new Error("Error deleting tech news");
  }
};

// Get all tech news
const getTechNews = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  try {
    const techNews = await db.techNews.findMany();
    return techNews;
  } catch (error) {
    console.error("Error retrieving tech news", error);
    throw new Error("Error retrieving tech news");
  }
};

// ----------- YouTube Video Functions -----------

// Add a new YouTube video
const createYouTubeVideo = async ({ title, url, description, thumbnail }: { title: string, url: string, description: string, thumbnail: string }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!title || !url || !description || !thumbnail) {
    throw new Error("Missing required fields");
  }

  try {
    const newVideo = await db.youTubeVideo.create({
      data: {
        title,
        url,
        description,
        thumbnail,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return newVideo;
  } catch (error) {
    console.error("Error creating YouTube video", error);
    throw new Error("Error creating YouTube video");
  }
};

// Update an existing YouTube video
const updateYouTubeVideo = async (id: string, { title, url, description, thumbnail }: { title: string, url: string, description: string, thumbnail: string }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id || !title || !url || !description || !thumbnail) {
    throw new Error("Missing required fields");
  }

  try {
    const updatedVideo = await db.youTubeVideo.update({
      where: { id },
      data: {
        title,
        url,
        description,
        thumbnail,
        updatedAt: new Date(),
      },
    });
    return updatedVideo;
  } catch (error) {
    console.error("Error updating YouTube video", error);
    throw new Error("Error updating YouTube video");
  }
};

// Delete an existing YouTube video
const deleteYouTubeVideo = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  if (!id) {
    throw new Error("YouTube Video ID is required");
  }

  try {
    await db.youTubeVideo.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting YouTube video", error);
    throw new Error("Error deleting YouTube video");
  }
};

// Get all YouTube videos
const getYouTubeVideos = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to perform this action");
  }

  try {
    const videos = await db.youTubeVideo.findMany();
    return videos;
  } catch (error) {
    console.error("Error retrieving YouTube videos", error);
    throw new Error("Error retrieving YouTube videos");
  }
};

export { 
  createBook, updateBook, deleteBook, getBooks, getBookById,
  createTechNews, updateTechNews, deleteTechNews, getTechNews,
  createYouTubeVideo, updateYouTubeVideo, deleteYouTubeVideo, getYouTubeVideos 
};

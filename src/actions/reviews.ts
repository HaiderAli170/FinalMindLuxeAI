"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

// Review interface for creation
interface ReviewProps {
  name: string;
  stars: number;
  description: string;
}

// Get all reviews
export const getReviews = async () => {
  // No auth required for getting reviews
  try {
    const reviews = await db.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return reviews;
  } catch (error) {
    console.error("Error retrieving reviews", error);
    throw new Error("Error retrieving reviews");
  }
};

// Get a specific review by ID
export const getReviewById = async (id: string) => {
  if (!id) throw new Error("Review ID is required");
  try {
    const review = await db.review.findUnique({ where: { id } });
    if (!review) throw new Error("Review not found");
    return review;
  } catch (error) {
    console.error("Error retrieving review", error);
    throw new Error("Error retrieving review");
  }
};

// Create a new review (any logged-in user)
export const createReview = async ({ name, stars, description }: ReviewProps) => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to perform this action");
  if (!name || !description || !stars) throw new Error("Missing required fields");
  try {
    const review = await db.review.create({
      data: {
        name,
        stars,
        description,
      },
    });
    return review;
  } catch (error) {
    console.error("Error creating review", error);
    throw new Error("Error creating review");
  }
};


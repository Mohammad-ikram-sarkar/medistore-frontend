import { cookies } from "next/headers";
import { env } from "../../env";
import { CreateReviewData } from "../../types/review.type";

const reviewService = {
    // Get reviews for a specific medicine
    getReviewsByMedicine: async (medicineId: string) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/reviews/medicine/${medicineId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await response.json();
            
            if (data.success) {
                return { data: data.data, error: null };
            } else {
                return { data: null, error: data.message || "Failed to fetch reviews" };
            }
        } catch (error) {
            return { data: null, error: "Failed to fetch reviews" };
        }
    },

    // Create a new review
    createReview: async (reviewData: CreateReviewData) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(reviewData)
            });
            const data = await response.json();
            
            if (data.success) {
                return { data: data.data, error: null };
            } else {
                return { data: null, error: data.message || "Failed to create review" };
            }
        } catch (error) {
            return { data: null, error: "Failed to create review" };
        }
    },

    // Update a review
    updateReview: async (reviewId: string, reviewData: Partial<CreateReviewData>) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/reviews/${reviewId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(reviewData)
            });
            const data = await response.json();
            
            if (data.success) {
                return { data: data.data, error: null };
            } else {
                return { data: null, error: data.message || "Failed to update review" };
            }
        } catch (error) {
            return { data: null, error: "Failed to update review" };
        }
    },

    // Delete a review
    deleteReview: async (reviewId: string) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await response.json();
            
            if (data.success) {
                return { data: data.data, error: null };
            } else {
                return { data: null, error: data.message || "Failed to delete review" };
            }
        } catch (error) {
            return { data: null, error: "Failed to delete review" };
        }
    }
};

export default reviewService;
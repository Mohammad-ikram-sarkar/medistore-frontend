"use server";

import reviewService from '@/service/review.service';
import { revalidatePath } from 'next/cache';
import { CreateReviewData } from '../../types/review.type';

export async function createReviewAction(reviewData: CreateReviewData) {
  try {
    const result = await reviewService.createReview(reviewData);
    
    if (result.error) {
      return { success: false, error: result.error };
    }

    // Revalidate the shop details page to show the new review
    revalidatePath(`/shop/${reviewData.medicineId}`);
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Create review action error:', error);
    return { success: false, error: 'Failed to create review' };
  }
}

export async function updateReviewAction(reviewId: string, reviewData: Partial<CreateReviewData>, medicineId: string) {
  try {
    const result = await reviewService.updateReview(reviewId, reviewData);
    
    if (result.error) {
      return { success: false, error: result.error };
    }

    // Revalidate the shop details page to show the updated review
    revalidatePath(`/shop/${medicineId}`);
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Update review action error:', error);
    return { success: false, error: 'Failed to update review' };
  }
}

export async function deleteReviewAction(reviewId: string, medicineId: string) {
  try {
    const result = await reviewService.deleteReview(reviewId);
    
    if (result.error) {
      return { success: false, error: result.error };
    }

    // Revalidate the shop details page to remove the deleted review
    revalidatePath(`/shop/${medicineId}`);
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Delete review action error:', error);
    return { success: false, error: 'Failed to delete review' };
  }
}
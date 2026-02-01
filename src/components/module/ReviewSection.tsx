"use client";

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Star, 
  MessageSquare, 
  User, 
  Calendar,
  Edit,
  Trash2,
  Plus,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { Review } from '../../../types/review.type';
import { createReviewAction, updateReviewAction, deleteReviewAction } from '@/action/review.actions';

interface ReviewSectionProps {
  medicineId: string;
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ medicineId, reviews: initialReviews }) => {
  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;
  const currentUserId = (session?.user as any)?.id;

  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  
  // Form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  
  const [isPending, startTransition] = useTransition();

  // Check if current user has already reviewed this medicine
  const userReview = reviews.find(review => review.authorId === currentUserId);
  const hasUserReviewed = !!userReview;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleCreateReview = async () => {
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    startTransition(async () => {
      try {
        const result = await createReviewAction({
          rating,
          comment: comment.trim(),
          medicineId
        });
        
        if (result.success) {
          setReviews(prev => [result.data, ...prev]);
          setRating(5);
          setComment('');
          setIsCreateDialogOpen(false);
          toast.success('Review created successfully');
        } else {
          toast.error(result.error || 'Failed to create review');
        }
      } catch (error) {
        toast.error('Failed to create review');
      }
    });
  };

  const handleEditReview = async () => {
    if (!editComment.trim() || !editingReview) {
      toast.error('Please write a comment');
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateReviewAction(editingReview.id, {
          rating: editRating,
          comment: editComment.trim()
        }, medicineId);
        
        if (result.success) {
          setReviews(prev => 
            prev.map(review => review.id === editingReview.id ? result.data : review)
          );
          setIsEditDialogOpen(false);
          setEditingReview(null);
          toast.success('Review updated successfully');
        } else {
          toast.error(result.error || 'Failed to update review');
        }
      } catch (error) {
        toast.error('Failed to update review');
      }
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    startTransition(async () => {
      try {
        const result = await deleteReviewAction(reviewId, medicineId);
        
        if (result.success) {
          setReviews(prev => prev.filter(review => review.id !== reviewId));
          toast.success('Review deleted successfully');
        } else {
          toast.error(result.error || 'Failed to delete review');
        }
      } catch (error) {
        toast.error('Failed to delete review');
      }
    });
  };

  const openEditDialog = (review: Review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment || '');
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Reviews ({reviews.length})
              </CardTitle>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  {renderStars(Math.round(parseFloat(calculateAverageRating())))}
                  <span className="text-lg font-semibold">{calculateAverageRating()}</span>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
              )}
            </div>

            {/* Add Review Button */}
            {isLoggedIn && !hasUserReviewed && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Write Review
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Rating</Label>
                      {renderStars(rating, true, setRating)}
                    </div>
                    <div>
                      <Label htmlFor="comment">Comment</Label>
                      <Textarea
                        id="comment"
                        placeholder="Share your experience with this medicine..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateReview} disabled={isPending}>
                      {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Submit Review
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {!isLoggedIn && (
              <Button disabled className="opacity-50">
                Login to Review
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600">
                {isLoggedIn 
                  ? 'Be the first to review this medicine!' 
                  : 'Login to write the first review!'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{review.author?.name || 'Anonymous'}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons for review owner */}
                  {currentUserId === review.authorId && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(review)}
                        disabled={isPending}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={isPending}
                        className="text-red-600 hover:text-red-700"
                      >
                        {isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {renderStars(review.rating)}
                  {review.comment && (
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              {renderStars(editRating, true, setEditRating)}
            </div>
            <div>
              <Label htmlFor="editComment">Comment</Label>
              <Textarea
                id="editComment"
                placeholder="Share your experience with this medicine..."
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingReview(null);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleEditReview} disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewSection;
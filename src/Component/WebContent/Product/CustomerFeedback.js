import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import RatingStars from "./../../RatingStars";
import { useFetchUserProfileQuery } from "../../../Services/userApiSlice";
import {
  useDeleteReviewMutation,
  useEditReviewMutation,
} from "../../../Services/feedbackApiSlice";

const CustomerFeedback = ({ feedback, onSubmit }) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: userProfile } = useFetchUserProfileQuery();
  const isLoggedIn = !!userProfile;
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();
  const [editReview] = useEditReviewMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    reviewId: "",
    rating: 0,
    comment: "",
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(id).unwrap();
    } catch (error) {
      alert("Failed to delete review");
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditData({
      reviewId: item.id,
      rating: item.reviews,
      comment: item.comment,
    });
    setEditModalOpen(true);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editReview(editData).unwrap();
      setEditModalOpen(false);
    } catch (error) {
      alert("Failed to update review");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ rating: newRating, comment: newComment });
      setNewRating(0);
      setNewComment("");
    } catch (error) {
      alert("Failed to submit review");
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-6 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      {/* Existing reviews */}
      <div className="space-y-6 mb-8">
        {feedback.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg relative">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {item.name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{item.name}</p>
                <RatingStars rating={item.reviews} />
                <p className="text-sm text-gray-500">{item.comment}</p>
              </div>
              {/* Buttons only for the review's author */}
              {userProfile?.id === item.userId && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                    disabled={deleting}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Give a review section */}
      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="border-2 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Give a Review</h3>

          <div className="mb-2 flex-1">
            <label className="block mb-1 font-medium">Your Rating</label>
            <RatingStars
              rating={newRating}
              onChange={(val) => setNewRating(val)}
              interactive
            />
          </div>

          <div className="mb-4">
            <textarea
              id="comment"
              className="w-full border rounded-md p-2"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              placeholder="Write your review here..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
      
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Review</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="block mb-2 font-medium">Rating</label>
              <RatingStars
                rating={editData.rating}
                onChange={(val) =>
                  setEditData((prev) => ({ ...prev, rating: val }))
                }
                interactive
              />

              <label className="block mt-4 mb-2 font-medium">Comment</label>
              <textarea
                value={editData.comment}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, comment: e.target.value }))
                }
                rows={4}
                className="w-full border p-2 rounded"
                required
              />

              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;

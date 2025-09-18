import React from "react";
import { useGetReviewsQuery } from "../../../../../../../Services/feedbackApiSlice";

const ReviewsTab = ({ packageData }) => {
  const targetId = packageData?.id;
  const targetType = "package";

  const { data: reviews = [], isLoading, isError } = useGetReviewsQuery({
    targetType,
    targetId,
  });

  if (isLoading) return <p className="text-gray-600">Loading reviews...</p>;
  if (isError) return <p className="text-red-500">Failed to load reviews.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>

      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => {
            const fullName = review.name || "Anonymous";
            const avatar = review.image || "/default-avatar.png";

            return (
              <li
                key={review.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={avatar}
                    alt={fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{fullName}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-auto text-yellow-500 font-bold">
                    {"⭐".repeat(review.rating || 0)}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">No reviews yet for this package.</p>
      )}
    </div>
  );
};

export default ReviewsTab;

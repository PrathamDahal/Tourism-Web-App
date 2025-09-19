// components/CustomerFeedbackContainer.jsx
import {
  useAddReviewMutation,
  useGetReviewsQuery,
} from "../../../Services/feedbackApiSlice";
import CustomerFeedback from "./CustomerFeedback";

const CustomerFeedbackContainer = ({ type, id }) => {
  const {
    data: feedback,
    isLoading,
    error,
  } = useGetReviewsQuery({
    targetType: type,
    targetId: id,
  });
  const [addReview] = useAddReviewMutation();

  const handleSubmitReview = async ({ rating, comment }) => {
    await addReview({
      targetType: type,
      targetId: id,
      rating,
      comment,
    }).unwrap();
  };

  if (isLoading) return <p>Loading feedback...</p>;
  if (error) return <p>Failed to load feedback.</p>;

  return <CustomerFeedback feedback={feedback} onSubmit={handleSubmitReview} />;
};

export default CustomerFeedbackContainer;

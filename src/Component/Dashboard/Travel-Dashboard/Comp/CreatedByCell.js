import { useGetUserByIdQuery } from "../../../../Services/userApiSlice";

const CreatedByCell = ({ userId }) => {
  const { data: user, isLoading } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  if (!userId) return <span className="text-gray-500">N/A</span>;
  if (isLoading) return <span className="text-gray-400">Loading...</span>;
  return <span>{user?.username || "Unknown User"}</span>;
};

export default CreatedByCell;

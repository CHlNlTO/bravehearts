import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

interface LikeButtonProps {
  braveId: bigint;
  initialLikeCount: number;
  initialLikedState: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  braveId,
  initialLikeCount,
  initialLikedState,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(initialLikedState);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchLikeCount = useCallback(async () => {
    try {
      const response = await fetch("/api/social/post/like/count/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ braveId }),
      });
      if (!response.ok) throw new Error("Failed to fetch like count");
      const data = await response.json();
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  }, [braveId]);

  useEffect(() => {
    fetchLikeCount();
  }, [fetchLikeCount]);

  const debouncedUpdateLike = useCallback(
    debounce(async (braveId: bigint, liked: boolean) => {
      setIsUpdating(true);
      try {
        const response = await fetch("/api/social/post/like/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ braveId, liked }),
        });
        if (!response.ok) throw new Error("Failed to update like status");
        const data = await response.json();
        setLikeCount(data.likeCount);
      } catch (error) {
        console.error("Error updating like:", error);
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      } finally {
        setIsUpdating(false);
      }
    }, 1000),
    []
  );

  const handleLike = () => {
    if (isUpdating) return;
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    debouncedUpdateLike(braveId, newLikedState);
  };

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <svg
        className={`h-4 w-4 cursor-pointer ${
          liked ? "text-red-500" : "text-gray-500 dark:text-gray-200"
        }`}
        fill={liked ? "currentColor" : "none"}
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleLike}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      <span className="text-sm">{likeCount}</span>
    </div>
  );
};

export default LikeButton;

import react from "react";

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  return `${hrs > 0 ? hrs + "h " : ""}${mins}m`;
};

export default formatDuration;
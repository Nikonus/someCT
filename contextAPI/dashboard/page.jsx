"use client";

import { useVideos } from "../context/VideoContext";

export default function DashboardPage() {

  // Yaha hum context se data le rahe hain
  const { videos, loading } = useVideos();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>All Videos</h1>

      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}
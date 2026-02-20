"use client";

// ======================= IMPORTS =======================

// React se required hooks import kar rahe hain
import { createContext, useContext, useState, useEffect } from "react";


// ======================= CONTEXT CREATE =======================

// Yaha hum context create kar rahe hain
// Default value undefined rakha gaya hai
const VideoContext = createContext(undefined);


// ======================= PROVIDER COMPONENT =======================

// Ye component pure app ko wrap karega
// Iska kaam hai global data share karna
export function VideoProvider({ children }) {

  // ======================= STATE =======================

  // videos state me API ka data store hoga
  const [videos, setVideos] = useState([]);

  // loading batayega data fetch ho raha hai ya nahi
  const [loading, setLoading] = useState(false);



  // ======================= FETCH FUNCTION =======================

  // Ye function backend API call karega
  const fetchVideos = async () => {

    try {
      setLoading(true); // loading start

      // API call
      const response = await fetch("/api/video");

      const data = await response.json();

      // videos state update
      setVideos(data.videos);

    } catch (error) {

      console.error("Error fetching videos:", error);

    } finally {

      setLoading(false); // loading stop
    }
  };



  // ======================= AUTO RUN ON LOAD =======================

  // Jab component mount hoga tab ye chalega
  useEffect(() => {
    fetchVideos();
  }, []);



  // ======================= PROVIDER RETURN =======================

  // Yaha hum values share kar rahe hain
  return (
    <VideoContext.Provider value={{ videos, loading, fetchVideos }}>
      {children}
    </VideoContext.Provider>
  );
}



// ======================= CUSTOM HOOK =======================

// Ye helper hook hai
// Direct useContext likhne ke bajaye hum useVideos() use karenge
export function useVideos() {

  const context = useContext(VideoContext);

  // Safety check
  if (!context) {
    throw new Error("useVideos must be used inside VideoProvider");
  }

  return context;
}
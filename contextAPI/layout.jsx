import { VideoProvider } from "./context/VideoContext";

export default function RootLayout({ children }) {

  // Yaha pura app VideoProvider ke andar wrap ho raha hai
  // Isliye har page videos access kar sakta hai

  return (
    <html lang="en">
      <body>
        <VideoProvider>
          {children}
        </VideoProvider>
      </body>
    </html>
  );
}
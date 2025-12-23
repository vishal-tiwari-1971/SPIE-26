import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: "SPIE-2026",
  description: "Event registration and dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

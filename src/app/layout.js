import "./globals.css";
import "./heist-theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: "OPERATION SPIE-2026",
  description: "Classified heist operation dashboard",
  other: {
    // This is a workaround - Google Fonts import handled via CSS
  },
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

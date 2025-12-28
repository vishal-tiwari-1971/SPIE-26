// import "./globals.css";
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Loader from "@/components/Loader"
// export const metadata = {
//   title: "SPIE-2026",
//   description: "Event registration and dashboard",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
         
//         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//           {children}
//         </GoogleOAuthProvider>
//       </body>
//     </html>
//   );
// }


// "use client";

// import { useState } from "react";
// import Loader from "@/components/Loader";

// export default function RootLayout({ children }) {
//   const [loading, setLoading] = useState(true);

//   return (
//     <html lang="en">
//       <body>
//         {loading ? (
//           <Loader onFinish={() => setLoading(false)} />
//         ) : (
//           children
//         )}
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
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
          <AppWrapper>
            {children}
          </AppWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}



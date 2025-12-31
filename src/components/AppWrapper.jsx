"use client";

// import { useState } from "react";
// import Loader from "./Loader";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// export default function AppWrapper({ children }) {
//   const [loading, setLoading] = useState(true);

//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//       {loading ? (
//         <Loader onFinish={() => setLoading(false)} />
//       ) : (
//         children
//       )}
//     </GoogleOAuthProvider>
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



"use client";

import { useState } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";

export default function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {/* Homepage wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: loading ? 0 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{ 
          minHeight: "100vh",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}


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
        initial={{ filter: "blur(20px)", scale: 1.05 }}
        animate={{
          filter: loading ? "blur(20px)" : "blur(0px)",
          scale: loading ? 1.05 : 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}


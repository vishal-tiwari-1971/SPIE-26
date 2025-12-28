
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Loader({ onFinish }) {
  const [count, setCount] = useState(1);


  // PERCENTAGE COUNTER LOGIC
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 1200);
          return 100;
        }
        return c + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  
  // SYNC CURVE WITH PERCENTAGE
  
  const TOTAL_POINTS = 40;

  const fullData = Array.from({ length: TOTAL_POINTS }, (_, i) => ({
    value: Math.sin(i / 4) * 20 + 60,
  }));

  const visiblePoints = Math.max(
    1,
    Math.floor((count / 100) * TOTAL_POINTS)
  );

  const syncedData = fullData.slice(0, visiblePoints);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1, y: -120 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={styles.wrapper}
      >
        {/* Background grid */}
        <div style={styles.grid} />

        {/* Header */}
        <div style={styles.header}>
          <span>OPERATION PRODYOG</span>
          <span style={styles.headerAccent}>INITIALIZING 🚨</span>
        </div>

        {/* Center content */}
        <div style={styles.center}>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              ...styles.title,
              ...(count === 100 ? styles.titleGlow : {}),
            }}
          >
            THE HEIST OF SOCIETY<br />
            OF PRODUCTION & INDUSTRIAL ENGINEERING 
           
           
          </motion.h1>

          {/* Percentage Counter */}
          <div
            style={{
              ...styles.counter,
              ...(count === 100 ? styles.counterGlow : {}),
            }}
          >
            {count}%
          </div>

          {/* FINAL STATUS */}
          <AnimatePresence>
            {count === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={styles.systemReady}
              >
                🎭 INDUSTRIAL OPERATION LIVE
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data dashboard */}
        <div style={styles.dashboard}>
          <div>
            <p style={styles.label}>Manufacturing Efficiency</p>
            <strong style={styles.value}>
              {Math.min(100, Math.floor(count * 1.02))}%
            </strong>
          </div>
          <div>
            <p style={styles.label}>Production Line Status</p>
            <strong style={styles.value}>CONTROLLED</strong>
          </div>
          <div>
            <p style={styles.label}>Money Flow</p>
            <strong style={styles.value}>OPTIMIZED 💰</strong>
          </div>
        </div>

        {/* Synced Chart */}
        <div style={styles.chart}>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={syncedData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#DC2626"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


// MONEY HEIST THEME STYLES

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(circle at top, #2b0f0f, #050505)",
    color: "#F8FAFC",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    zIndex: 9999,
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "80px 80px",
  },

  header: {
    position: "absolute",
    top: 32,
    left: 40,
    display: "flex",
    gap: 12,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.3em",
    color: "#9CA3AF",
  },

  headerAccent: {
    color: "#DC2626",
  },

  center: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },

  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "72px",
    fontWeight: 800,
    lineHeight: 1.05,
    background:
      "linear-gradient(180deg, #ffffff 0%, #fecaca 45%, #dc2626 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 10px 40px rgba(220,38,38,0.4)",
  },

  titleGlow: {
    textShadow: `
      0 0 40px rgba(220,38,38,0.7),
      0 0 80px rgba(220,38,38,0.5)
    `,
  },

  counter: {
    marginTop: 26,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 28,
    letterSpacing: "0.3em",
    color: "#F87171",
  },

  counterGlow: {
    color: "#F87171",
    textShadow: `
      0 0 10px rgba(248,113,113,0.9),
      0 0 25px rgba(248,113,113,0.6)
    `,
  },

  systemReady: {
    marginTop: 18,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14,
    letterSpacing: "0.4em",
    color: "#FCA5A5",
    textShadow: `
      0 0 12px rgba(220,38,38,0.8),
      0 0 30px rgba(220,38,38,0.6)
    `,
  },

  dashboard: {
    position: "absolute",
    bottom: 120,
    left: 40,
    right: 40,
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "'JetBrains Mono', monospace",
  },

  label: {
    fontSize: 12,
    letterSpacing: "0.15em",
    color: "#9CA3AF",
    marginBottom: 6,
  },

  value: {
    fontSize: 14,
    letterSpacing: "0.1em",
    color: "#F8FAFC",
  },

  chart: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
  },
};

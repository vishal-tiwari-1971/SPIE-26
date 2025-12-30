
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Loader({ onFinish }) {
  const [count, setCount] = useState(1);

  /* ================= COUNTER ================= */
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

  /* ================= CHART SYNC ================= */
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
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, y: -80 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={styles.wrapper}
      >
        {/* Grid */}
        <div style={styles.grid} />

        {/* Header */}
        <div style={styles.header}>
          <span>OPERATION PRODYOG</span>
          <span style={styles.headerAccent}>INITIALIZING 🚨</span>
        </div>

        {/* Center */}
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
            THE Society OF<br />
            PRODUCTION & INDUSTRIAL<br />
            ENGINEERING
          </motion.h1>

          <div
            style={{
              ...styles.counter,
              ...(count === 100 ? styles.counterGlow : {}),
            }}
          >
            {count}%
          </div>

          <AnimatePresence>
            {count === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={styles.systemReady}
              >
                🎭 INDUSTRIAL OPERATION LIVE
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard */}
        <div style={styles.dashboard}>
          <div>
            <p style={styles.label}>Manufacturing Efficiency</p>
            <strong style={styles.value}>
              {Math.min(100, Math.floor(count * 1.02))}%
            </strong>
          </div>

          <div>
            <p style={styles.label}>Production Line</p>
            <strong style={styles.value}>CONTROLLED</strong>
          </div>

          <div>
            <p style={styles.label}>Money Flow</p>
            <strong style={styles.value}>OPTIMIZED 💰</strong>
          </div>
        </div>

        {/* Chart */}
        <div style={styles.chart}>
          <ResponsiveContainer width="100%" height={90}>
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

/* ================= RESPONSIVE MONEY HEIST STYLES ================= */

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "radial-gradient(circle at top, #2b0f0f, #050505)",
    color: "#F8FAFC",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    zIndex: 9999,
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "70px 70px",
  },

  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "clamp(10px, 2.5vw, 12px)",
    letterSpacing: "0.25em",
    color: "#9CA3AF",
  },

  headerAccent: {
    color: "#DC2626",
  },

  center: {
    position: "absolute",
    top: "46%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "90%",
  },

  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "clamp(28px, 8vw, 72px)",
    fontWeight: 800,
    lineHeight: 1.05,
    background:
      "linear-gradient(180deg, #ffffff 0%, #fecaca 45%, #dc2626 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 8px 30px rgba(220,38,38,0.4)",
  },

  titleGlow: {
    textShadow:
      "0 0 40px rgba(220,38,38,0.7), 0 0 80px rgba(220,38,38,0.5)",
  },

  counter: {
    marginTop: 20,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "clamp(18px, 4vw, 28px)",
    letterSpacing: "0.3em",
    color: "#F87171",
  },

  counterGlow: {
    textShadow:
      "0 0 10px rgba(248,113,113,0.9), 0 0 25px rgba(248,113,113,0.6)",
  },

  systemReady: {
    marginTop: 14,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "clamp(10px, 2.8vw, 14px)",
    letterSpacing: "0.35em",
    color: "#FCA5A5",
    textShadow:
      "0 0 12px rgba(220,38,38,0.8), 0 0 30px rgba(220,38,38,0.6)",
  },

  dashboard: {
    position: "absolute",
    bottom: 110,
    left: 20,
    right: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 16,
    fontFamily: "'JetBrains Mono', monospace",
    textAlign: "center",
  },

  label: {
    fontSize: "clamp(10px, 2.5vw, 12px)",
    letterSpacing: "0.15em",
    color: "#9CA3AF",
    marginBottom: 6,
  },

  value: {
    fontSize: "clamp(12px, 3vw, 14px)",
    letterSpacing: "0.1em",
    color: "#F8FAFC",
  },

  chart: {
    position: "absolute",
    bottom: 28,
    left: 20,
    right: 20,
  },
};


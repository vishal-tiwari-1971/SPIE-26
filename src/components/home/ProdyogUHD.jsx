

"use client";
export default function ProdyogUHD() {
  return (
    <div  className="prodyog-uhd-wrapper" >
      <svg
      className="prodyog-uhd-svg"
        width="550"
        height="550"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ===== DEFS ===== */}
        <defs>
          <radialGradient id="coreGlow" r="60%">
            <stop offset="0%" stopColor="#ff3b3b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ff3b3b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>



        {/* ===== OUTER RING (ANTI-CLOCKWISE) ===== */}
        <g transform="translate(400 400)">
          <circle
            r="300"
            fill="none"
            stroke="#ff3b3b"
            strokeWidth="2"
            strokeDasharray="10 10"
            opacity="0.6"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360"
              to="0"
              dur="40s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        
{/* ===== MECHANICAL GEAR  ===== */}
<g transform="translate(400 400)">
  {/* Outer teeth ring */}
  <path
    d="
      M0 -160
      L18 -145 L42 -150 L58 -132
      L92 -118 L104 -92 L132 -78
      L150 -42 L145 -18 L160 0
      L145 18 L150 42 L132 58
      L118 92 L92 104 L78 132
      L42 150 L18 145 L0 160
      L-18 145 L-42 150 L-58 132
      L-92 118 L-104 92 L-132 78
      L-150 42 L-145 18 L-160 0
      L-145 -18 L-150 -42 L-132 -58
      L-118 -92 L-92 -104 L-78 -132
      L-42 -150 L-18 -145
      Z
    "
    fill="none"
    stroke="#ff3b3b"
    strokeWidth="4"
    strokeLinejoin="round"
    filter="url(#glow)"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0"
      to="360"
      dur="22s"
      repeatCount="indefinite"
    />
  </path>

  {/* Gear body */}
  <circle
    r="105"
    fill="none"
    stroke="#ff5a5a"
    strokeWidth="2"
    opacity="0.8"
  />

  {/* Shaft hole */}
  <circle
    r="42"
    fill="#06080d"
    stroke="#ff6b6b"
    strokeWidth="3"
  />

  {/* Bolt holes */}
  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
    <circle
      key={i}
      cx={Math.cos((deg * Math.PI) / 180) * 65}
      cy={Math.sin((deg * Math.PI) / 180) * 65}
      r="5"
      fill="#ff3b3b"
    />
  ))}
</g>



        {/* ===== CORE GLOW ===== */}
        <circle cx="400" cy="400" r="120" fill="url(#coreGlow)" />

        {/* ===== CROSSHAIR ===== */}
        <line x1="400" y1="100" x2="400" y2="700" stroke="#ff3b3b" opacity="0.4" />
        <line x1="100" y1="400" x2="700" y2="400" stroke="#ff3b3b" opacity="0.4" />

        {/* ===== TEXT MORPH ===== */}
        <g filter="url(#glow)">
          {/* SPIE */}
          <text
            x="400"
            y="410"
            textAnchor="middle"
            fontSize="44"
            fill="#ffffff"
            fontWeight="700"
            letterSpacing="4"
          >
            SPIE
            <animate
              attributeName="opacity"
              values="1;1;0;0"
              keyTimes="0;0.4;0.55;1"
              dur="12s"
              repeatCount="indefinite"
            />
          </text>

          {/* PRODYOG */}
          <text
            x="400"
            y="410"
            textAnchor="middle"
            fontSize="44"
            fill="#ffffff"
            fontWeight="700"
            letterSpacing="3"
            opacity="0"
          >
            PRODYOG
            <animate
              attributeName="opacity"
              values="0;0;1;1"
              keyTimes="0;0.4;0.55;1"
              dur="12s"
              repeatCount="indefinite"
            />
          </text>
        </g>

        {/* ===== SUB-LABEL ===== */}
        <text
          x="400"
          y="450"
          textAnchor="middle"
          fontSize="14"
          fill="#ff3b3b"
          letterSpacing="2"
        >
          TECHNO-INDUSTRIAL COMMAND CORE
        </text>


        {/* =====  LABEL RING (ROTATES) ===== */}
<g transform="translate(400 400)">
  {/* Rotating ring */}
  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0"
      to="-360"
      dur="60s"
      repeatCount="indefinite"
    />

    {/* ===== LABEL GROUPS ===== */}

    {/* MACHINE */}
    <g transform="translate(0 -320)">
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="60s"
          repeatCount="indefinite"
        />
        <text
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#ff6b6b"
          letterSpacing="2"
        >
          MACHINE
        </text>
      </g>
    </g>

    {/* PROCESS FLOW */}
    <g transform="translate(320 0)">
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="60s"
          repeatCount="indefinite"
        />
        <text
          textAnchor="middle"
          fontSize="16"
          fill="#ff6b6b"
          letterSpacing="2"
        >
          PROCESS FLOW
        </text>
      </g>
    </g>

    {/* EXECUTION */}
    <g transform="translate(0 335)">
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="60s"
          repeatCount="indefinite"
        />
        <text
          textAnchor="middle"
          fontSize="16"
          fill="#ff6b6b"
          letterSpacing="2"
        >
          EXECUTION
        </text>
      </g>
    </g>

    {/* OPTIMIZATION */}
    <g transform="translate(-320 0)">
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="60s"
          repeatCount="indefinite"
        />
        <text
          textAnchor="middle"
          fontSize="16"
          fill="#ff6b6b"
          letterSpacing="2"
        >
          OPTIMIZATION
        </text>
      </g>
    </g>
  </g>
</g>

      </svg>
      <style jsx>{`
        .prodyog-uhd-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .prodyog-uhd-svg {
          position: absolute;

          width: 500px;
          height: 500px;
          opacity: 0.55;

          /* MOVE RIGHT + UP */
          right: -2px;
          top: 70px;

          filter: drop-shadow(0 0 120px rgba(255, 59, 59, 0.25));
        }

        /* ===== TABLET ===== */
        @media (max-width: 1024px) {
          .prodyog-uhd-svg {
            width: 620px;
            height: 620px;
            right: -80px;
            top: -120px;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
          .prodyog-uhd-wrapper {
            z-index: 0; /* behind hero text */
          }

          .prodyog-uhd-svg {
            width: 420px;
            height: 420px;
            right: -40px;
            top: 80px;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
   );
}

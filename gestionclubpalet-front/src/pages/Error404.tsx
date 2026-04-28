import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen text-center gap-10 px-4">
      {/* Palet qui roule */}
      <div className="w-64 h-20 overflow-hidden relative">
        <svg width="260" height="90" viewBox="0 0 260 90">
          <rect
            x="0"
            y="68"
            width="260"
            height="8"
            rx="2"
            fill="#0e0d0d"
            opacity="0.4"
          />
          <g
            className="animate-[roll_2.5s_ease-out_forwards]"
            style={{
              animation: "roll 2.5s ease-out forwards",
            }}
          >
            <ellipse cx="30" cy="62" rx="28" ry="9" fill="#4A4A4A" />
            <ellipse cx="30" cy="56" rx="28" ry="9" fill="#6B6B6B" />
            <path d="M2 56 L2 62 L58 62 L58 56 Z" fill="#5A5A5A" />
            <ellipse
              cx="30"
              cy="56"
              rx="22"
              ry="6"
              fill="#7A7A7A"
              opacity="0.5"
            />
            <text
              x="30"
              y="59"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="700"
              fill="#3A3A3A"
              fontFamily="sans-serif"
            >
              10
            </text>
          </g>
        </svg>
      </div>
      {/* 404 */}
      <div className="flex items-center gap-1">
        <span className="text-9xl font-medium tracking-tighter">
          4
        </span>

        {/* Le 0 = palet vue 3/4 */}
        <svg
          width="128"
          height="128"
          viewBox="0 0 72 96"
          className="shrink-0"
        >
          <ellipse
            cx="36"
            cy="90"
            rx="26"
            ry="4"
            fill="#888"
            opacity="0.12"
          />
          <ellipse cx="36" cy="66" rx="30" ry="9" fill="#3A3A3A" />
          <path
            d="M4 56 L4 66 Q4 75 36 75 Q68 75 68 66 L68 56 Z"
            fill="#525252"
          />
          <ellipse cx="36" cy="56" rx="30" ry="9" fill="#6B6B6B" />
          <ellipse
            cx="36"
            cy="56"
            rx="24"
            ry="7"
            fill="#787878"
            opacity="0.55"
          />
        </svg>

        <span className="text-9xl font-medium tracking-tighter">
          4
        </span>
      </div>
      {/* Message */}
      <div className="flex flex-col gap-2">
        <p className="text-xl font-medium text-blue-700">
          Ce palet est sorti de la plaque
        </p>
        <p className="text-lg text-slate-600  leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
          <br></br>Retournez à l'accueil et relancez votre palet.
        </p>
      </div>
      {/* Boutons */}
      <Link
        to="/"
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-400 text-sm font-medium hover:bg-zinc-300 transition-colors"
      >
        Retour à l'accueil
      </Link>
      {/* Animation keyframe */}
      <style>{`
        @keyframes roll {
          0%   { transform: translateX(-80px) rotate(0deg);   opacity: 0; }
          15%  { opacity: 1; }
          70%  { transform: translateX(20px)  rotate(340deg); opacity: 1; }
          85%  { transform: translateX(28px)  rotate(355deg); opacity: 1; }
          100% { transform: translateX(24px)  rotate(350deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

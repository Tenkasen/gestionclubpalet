import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen text-center gap-8 px-4">
      {/* Palet animé */}
      <svg
        className="animate-spin"
        style={{ animationDuration: "3s" }}
        width="72"
        height="72"
        viewBox="0 0 72 72"
      >
        <ellipse
          cx="36"
          cy="36"
          rx="34"
          ry="34"
          fill="#5F5E5A"
          stroke="#444441"
          strokeWidth="2"
        />
        <ellipse
          cx="36"
          cy="36"
          rx="24"
          ry="24"
          fill="#444441"
          stroke="#2C2C2A"
          strokeWidth="1.5"
        />
        <ellipse cx="36" cy="36" rx="10" ry="10" fill="#2C2C2A" />
        <line
          x1="36"
          y1="2"
          x2="36"
          y2="12"
          stroke="#888780"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="60"
          x2="36"
          y2="70"
          stroke="#888780"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="2"
          y1="36"
          x2="12"
          y2="36"
          stroke="#888780"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="36"
          x2="70"
          y2="36"
          stroke="#888780"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* 404 avec palet en guise de 0 */}
      <div className="flex items-baseline gap-3">
        <span className="text-8xl font-medium tracking-tighter">
          4
        </span>
        <svg width="52" height="80" viewBox="0 0 52 80">
          <ellipse
            cx="26"
            cy="40"
            rx="24"
            ry="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <ellipse
            cx="26"
            cy="40"
            rx="16"
            ry="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <ellipse
            cx="26"
            cy="40"
            rx="6"
            ry="6"
            fill="currentColor"
            fillOpacity="0.3"
          />
        </svg>
        <span className="text-8xl font-medium tracking-tighter">
          4
        </span>
      </div>

      {/* Message */}
      <div className="max-w-sm flex flex-col gap-2">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Ce palet est sorti de la piste
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée.
          Retournez au classement et relancez votre palet.
        </p>
      </div>

      {/* Boutons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

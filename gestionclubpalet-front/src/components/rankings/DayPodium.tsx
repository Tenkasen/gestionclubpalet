import type { IChampMatches } from "../../types/champMatches.ts";

const RANKS = [
  {
    order: "order-2",
    blockH: "h-[52px]",
    border: "border-[#FAC775]",
    laurier: "/podium/laurier_1.png",
  },
  {
    order: "order-1",
    blockH: "h-[18px]",
    border: "border-[#B4B2A9]",
    laurier: "/podium/laurier_2.png",
  },
  {
    order: "order-3",
    border: "border-[#F0997B]",
    laurier: "/podium/laurier_3.png",
  },
];

// Display order: 2nd | 1st | 3rd
const DISPLAY_ORDER = [1, 0, 2];

export default function DayPodium({
  top3,
}: {
  top3: IChampMatches[];
}) {
  if (top3.length < 3) return null;

  return (
    <>
      <h1 className="text-2xl font-bold italic py-6 text-center px-6">
        Meilleurs joueurs de la journée
      </h1>
      <div className="flex items-end justify-center gap-2 px-4">
        {DISPLAY_ORDER.map((i) => {
          const p = top3[i];
          const r = RANKS[i];
          const gaColor =
            p.goalAverage > 0
              ? "text-blue-700"
              : p.goalAverage < 0
                ? "text-red-700"
                : "text-gray-500";

          return (
            <div
              key={i}
              className={`flex-1 flex flex-col items-center `}
            >
              <img
                src={r.laurier}
                alt={`Rang ${i + 1}`}
                className="w-18 h-18 object-contain mb-1"
              />
              <div
                className={`bg-white border ${r.border} rounded-xl px-2 pt-3 w-full`}
              >
                <p className="font-medium text-center truncate w-full mb-2">
                  {p.player.prenom} {p.player.nom}
                </p>
                <div className="w-full h-px bg-gray-200 mb-2" />
                <div className="grid grid-cols-2 gap-x-1 gap-y-2 w-full mb-2">
                  <Stat
                    label="Pour"
                    value={p.totalPour}
                    className="text-blue-700"
                  />
                  <Stat
                    label="Contre"
                    value={p.totalContre}
                    className="text-red-700"
                  />
                  <Stat
                    label="Goal avg"
                    value={
                      p.goalAverage > 0
                        ? `+${p.goalAverage}`
                        : p.goalAverage
                    }
                    className={gaColor}
                  />
                  <Stat
                    label="Victoires"
                    value={`${p.nbVictoire}/6`}
                  />
                </div>
              </div>
              <div className={`w-full rounded-b-xl ${r.blockH} `} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  className = "text-gray-800",
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[11px] text-gray-500 uppercase tracking-widest">
        {label}
      </span>
      <span className={`text-sm font-medium ${className}`}>
        {value}
      </span>
    </div>
  );
}

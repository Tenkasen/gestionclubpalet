import type { IRanking } from "../../types/ranking";

interface IProps {
  data: IRanking[];
  type: "ENTRAINEMENT" | "CHAMPIONNAT" | "COUPE";
  dayNumber?: number;
}
export default function RankingTables({
  data,
  type,
  dayNumber,
}: IProps) {
  return (
    <div className="w-fit mx-auto">
      <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-md">
        <table className=" text-sm">
          <thead>
            <tr>
              <td
                colSpan={type === "CHAMPIONNAT" ? 6 : 5}
                className="bg-gray-900 text-gray-100 text-center text-base font-semibold
                       tracking-widest uppercase px-4 py-3.5 border-b-2 border-gray-700"
              >
                {dayNumber
                  ? `Classement J${dayNumber}`
                  : "Classement final"}
              </td>
            </tr>
            <tr className="bg-gray-700 text-gray-200 text-xs uppercase tracking-wider">
              <th className="px-3 py-3 text-center border-r border-gray-600 w-10">
                Classement
              </th>
              <th className="px-30 py-3 text-center border-r border-gray-600">
                Nom Prénom
              </th>
              <th className="px-3 py-3 text-center border-r border-gray-600 w-24 whitespace-nowrap">
                Présences
              </th>
              <th className="px-3 py-3 text-center border-r border-gray-600 w-28 whitespace-nowrap">
                Goal Average
              </th>
              {type === "CHAMPIONNAT" && (
                <th className="px-3 py-3 text-center border-r border-gray-600 w-32 whitespace-nowrap">
                  Parties gagnées
                </th>
              )}
              <th className="px-3 py-3 text-center w-20">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry.playerId}
                className={[
                  "border-b border-gray-300 transition-colors last:border-0 hover:bg-gray-300",
                  index % 2 === 0 ? "bg-gray-200" : "bg-white",
                ].join(" ")}
              >
                <td
                  className={[
                    "px-3 py-3 text-center font-bold border-r border-gray-300",
                    index === 0 && "bg-[#ffd700] text-yellow-900",
                    index === 1 && "bg-[#b7e1cd] text-slate-700",
                    index === 2 && "bg-[#614e1a] text-orange-900",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : entry.position}
                </td>
                <td className="px-4 py-3 text-center font-medium border-r border-gray-300">
                  {entry.nom} {entry.prenom}
                </td>
                <td className="px-3 py-3 text-center border-r border-gray-300">
                  {entry.presences}
                </td>
                <td className="px-3 py-3 text-center border-r border-gray-300">
                  {entry.goalAverage}
                </td>
                <td className="px-3 py-3 text-center font-bold text-gray-900">
                  {entry.points}
                </td>
                {/* {type === "CHAMPIONNAT" && (
                  <td className="px-3 py-3 text-center border-r border-gray-300">
                    {entry.nbVictoires} // todo : pour championnat
                  </td>
                )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

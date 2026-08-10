import type { IRanking } from "../../types/ranking";

interface IProps {
  data: IRanking[];
  type: "ENTRAINEMENT" | "CHAMPIONNAT" | "COUPE";
  dayIndex?: number;
}
export default function RankingTables({
  data,
  type,
  dayIndex,
}: IProps) {
  const subHeaderStyle =
    "py-3 text-center border-r border-table-subheader-border";

  return (
    <div className="w-fit ">
      <div className="overflow-x-auto rounded-xl border border-table-border shadow-md">
        <table className=" text-sm">
          <thead>
            <tr>
              <td
                colSpan={type === "CHAMPIONNAT" ? 6 : 5}
                className="bg-table-header text-table-header-text text-center text-base font-semibold
                       tracking-widest uppercase px-4 py-3.5 border-b-2 border-table-border"
              >
                {dayIndex
                  ? `Classement J${dayIndex}`
                  : "Classement final"}
              </td>
            </tr>
            <tr className="bg-table-subheader text-table-subheader-text text-xs uppercase tracking-wider">
              <th className={`px-3 ${subHeaderStyle} w-10`}>
                Classement
              </th>
              <th className={`px-30 ${subHeaderStyle}`}>
                Nom Prénom
              </th>
              <th
                className={`px-3 ${subHeaderStyle} w-24 whitespace-nowrap`}
              >
                Présences
              </th>
              <th
                className={`px-3 ${subHeaderStyle} w-28 whitespace-nowrap`}
              >
                Goal Average
              </th>
              <th className={`px-3 ${subHeaderStyle} w-20`}>
                Points
              </th>
              {type === "CHAMPIONNAT" && (
                <th className="px-3 py-3 text-center w-32 whitespace-nowrap">
                  Parties gagnées
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry.playerId}
                className={[
                  "border-b border-table-row-hover transition-colors last:border-0 hover:bg-table-row-hover",
                  index % 2 === 0
                    ? "bg-table-row-even"
                    : "bg-surface",
                ].join(" ")}
              >
                <td
                  className={[
                    "px-3 py-3 text-center font-bold border-r border-table-row-hover",
                    index === 0 && "bg-[#ffd700]",
                    index === 1 && "bg-[#b7e1cd]",
                    index === 2 && "bg-[#614e1a]",
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
                <td className="px-3 py-3 text-center border-r border-table-row-hover font-medium">
                  {entry.nom} {entry.prenom}
                </td>
                <td className="px-3 py-3 text-center border-r border-table-row-hover">
                  {entry.presences}
                </td>
                <td className="px-3 py-3 text-center border-r border-table-row-hover">
                  {entry.goalAverage}
                </td>
                <td className="px-3 py-3 text-center font-bold text-table-header">
                  {entry.points}
                </td>
                {type === "CHAMPIONNAT" && (
                  <td className="px-3 py-3 text-center border-l border-table-row-hover">
                    {entry.nbVictoire}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

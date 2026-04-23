import type { IRanking } from "../../types/ranking";

interface IProps {
  data: IRanking[];
  type: "training" | "championship";
  dayName?: string;
}
export default function RankingTables({ type }: IProps) {
  const data = [
    {
      playerId: 10,
      nom: "BOURDET",
      prenom: "Mickaël",
      presences: 2,
      totalPour: 40,
      totalContre: 4,
      goalAverage: 36,
      points: 40,
      position: 1,
    },
    {
      playerId: 2,
      nom: "BOURDET",
      prenom: "Fabien",
      presences: 2,
      totalPour: 33,
      totalContre: 11,
      goalAverage: 22,
      points: 33,
      position: 2,
    },
    {
      playerId: 1,
      nom: "CHOUIN",
      prenom: "Teddy",
      presences: 2,
      totalPour: 18,
      totalContre: 21,
      goalAverage: -3,
      points: 18,
      position: 3,
    },
    {
      playerId: 5,
      nom: "VERGNE",
      prenom: "Jérôme",
      presences: 1,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 4,
    },
    {
      playerId: 6,
      nom: "GIRAUDET",
      prenom: "Damien",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 5,
    },
    {
      playerId: 4,
      nom: "GUILLOTEAU",
      prenom: "David",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 6,
    },
    {
      playerId: 9,
      nom: "GUILLOTEAU",
      prenom: "Kévin",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 7,
    },
    {
      playerId: 8,
      nom: "MOREAU",
      prenom: "Yann",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 8,
    },
    {
      playerId: 11,
      nom: "PADIOLLEAU",
      prenom: "Romain",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 9,
    },
    {
      playerId: 7,
      nom: "REMAUD",
      prenom: "Brice",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 10,
    },
    {
      playerId: 3,
      nom: "ROBIN",
      prenom: "Ludovic",
      presences: 2,
      totalPour: 0,
      totalContre: 0,
      goalAverage: 0,
      points: 0,
      position: 11,
    },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-md mx-auto w-fit">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <td
              colSpan={type === "championship" ? 6 : 5}
              className="bg-gray-900 text-gray-100 text-center text-base font-semibold
                     tracking-widest uppercase px-4 py-3.5 border-b-2 border-gray-700"
            >
              Classement J2
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
            {type === "championship" && (
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
                  index === 0 && "bg-yellow-200 text-yellow-900",
                  index === 1 && "bg-slate-200 text-slate-700",
                  index === 2 && "bg-orange-200 text-orange-900",
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

              {type === "championship" && (
                <td className="px-3 py-3 text-center border-r border-gray-300">
                  {entry.partiesGagnees}
                </td>
              )}

              <td className="px-3 py-3 text-center font-bold text-gray-900">
                {entry.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

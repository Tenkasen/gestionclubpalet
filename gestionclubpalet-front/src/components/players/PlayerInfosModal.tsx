import {
  X,
  Mail,
  Phone,
  Cake,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";
import type { IPlayer } from "../../types/player.ts";

type Props = { player: IPlayer; onClose: () => void };

const empty = (val?: string) => (val?.trim() ? val : null);

function calcAge(dateStr?: string) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function fmtDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type RowProps = {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
};

function Row({ icon, label, value }: RowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-stone-200 last:border-0">
      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-left ml-2 uppercase tracking-wide text-stone-400 leading-none mb-0.5">
          {label}
        </p>
        {value ? (
          <p className="font-medium text-[15px] text-stone-700">
            {value}
          </p>
        ) : (
          <p className="text-sm italic text-stone-400">
            Non renseigné
          </p>
        )}
      </div>
    </div>
  );
}

export default function PlayerInfosModal({ player, onClose }: Props) {
  const {
    id,
    nom,
    prenom,
    email,
    telephone,
    anniversaire,
    dateInscription,
  } = player;

  const bDate = fmtDate(anniversaire);
  const bAge = calcAge(anniversaire);
  const birthdayValue = bDate
    ? `${bDate}${bAge !== null ? `   (${bAge} ans)` : ""}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 cursor-default">
      <div className="bg-stone-100 rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm mx-6 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-800 px-5 py-4 relative">
          <div className="flex items-center">
            <div>
              <h2 className="text-white font-semibold text-xl leading-tight">
                {prenom} {nom}
              </h2>
              <span className="flex items-center gap-1.5 text-indigo-300 text-xs mt-0.5">
                <BadgeCheck size={13} />
                Licencié #{id}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-indigo-300 hover:text-white hover:bg-white/15 rounded-md p-1 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-3 bg-white">
          <Row
            icon={<Mail size={20} />}
            label="Adresse mail"
            value={empty(email)}
          />
          <Row
            icon={<Phone size={20} />}
            label="Téléphone"
            value={empty(telephone)}
          />
          <Row
            icon={<Cake size={20} />}
            label="Date de naissance"
            value={birthdayValue}
          />
          <Row
            icon={<CalendarCheck size={20} />}
            label="Inscrit le"
            value={fmtDate(dateInscription)}
          />
        </div>
      </div>
    </div>
  );
}

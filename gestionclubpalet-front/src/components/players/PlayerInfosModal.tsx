import {
  X,
  Mail,
  Phone,
  Cake,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";
import type { IPlayer } from "../../types/player.ts";

interface IProps {
  player: IPlayer;
  onClose: () => void;
}

function empty(value?: string) {
  return value?.trim() ? value : null;
}

function calculateAge(dateString?: string) {
  if (!dateString) return null;
  const age = Date.now() - new Date(dateString).getTime();
  return Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
}

function formatDate(dateString?: string) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTelNumber(telNumber?: string) {
  if (!telNumber) return null;
  const phoneArray: string[] = [];
  for (let index = 0; index < telNumber.length; index += 2) {
    const phoneNumber = telNumber.slice(index, index + 2);
    console.log(phoneNumber);

    phoneArray.push(phoneNumber);
  }
  return phoneArray.join(" ");
}

interface IRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

function Row({ icon, label, value }: IRowProps) {
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

export default function PlayerInfosModal({
  player,
  onClose,
}: IProps) {
  const {
    id,
    nom,
    prenom,
    email,
    telephone,
    anniversaire,
    dateInscription,
  } = player;

  const birthDate = formatDate(anniversaire);
  const birthAge = calculateAge(anniversaire);
  const birthdayValue = birthDate
    ? `${birthDate} (${birthAge} ans)`
    : null;

  const phoneNumber = formatTelNumber(telephone);
  const phoneValue = phoneNumber ? phoneNumber : null;

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
            value={phoneValue}
          />
          <Row
            icon={<Cake size={20} />}
            label="Date de naissance"
            value={birthdayValue}
          />
          <Row
            icon={<CalendarCheck size={20} />}
            label="Inscrit le"
            value={formatDate(dateInscription)}
          />
        </div>
      </div>
    </div>
  );
}

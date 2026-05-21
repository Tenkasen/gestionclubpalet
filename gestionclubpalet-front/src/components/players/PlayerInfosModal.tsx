import {
  Mail,
  Phone,
  Cake,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";
import type { IPlayer } from "../../types/player.ts";
import BaseModal from "../modals/BaseModal.tsx";
import CloseButton from "../ui/CloseButton.tsx";

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
    <div className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
      <div className="w-10 h-10 rounded-lg bg-title-muted/15 flex items-center justify-center shrink-0 text-title/85">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-left ml-2 uppercase tracking-wide text-foreground-subtle leading-none mb-0.5">
          {label}
        </p>
        {value ? (
          <p className="font-medium text-[15px] text-foreground">
            {value}
          </p>
        ) : (
          <p className="text-sm italic text-foreground-subtle">
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
    <BaseModal maxWidth="max-w-sm" variant="infos">
      {/* Header */}
      <div className="bg-title px-5 py-4 relative">
        <div className="flex items-center">
          <div>
            <h2 className="text-surface font-semibold text-xl leading-tight">
              {prenom} {nom}
            </h2>
            <span className="flex items-center gap-1.5 text-surface/60 text-xs mt-0.5">
              <BadgeCheck size={13} />
              Licencié #{id}
            </span>
          </div>
        </div>
        <CloseButton onClose={onClose} variant="dark" />
      </div>

      {/* Body */}
      <div className="px-5 py-3 bg-surface">
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
    </BaseModal>
  );
}

import type { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  subtitle: string;
  value: string;
}

const ProfileStatCard = ({
  icon,
  subtitle,
  value,
}: Props) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-center gap-4 min-h-[92px]">
      
      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-zinc-500 truncate">
          {subtitle}
        </p>

        <h3 className="text-lg font-semibold text-zinc-800 mt-1 truncate">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default ProfileStatCard;
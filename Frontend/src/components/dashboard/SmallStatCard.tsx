import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
} from "lucide-react";

const iconMap: any = {
  users: Users,
  present: UserCheck,
  absent: UserX,
  leave: CalendarDays,
};

interface Props {
  title: string;
  value: number;
  icon: string;
}

const SmallStatCard = ({
  title,
  value,
  icon,
}: Props) => {
  const Icon = iconMap[icon];

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl px-4 py-3 hover:border-zinc-400 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">
            {title}
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-1">
            {value}
          </h2>
        </div>

        <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center">
          <Icon
            size={20}
            className="text-zinc-700"
          />
        </div>
      </div>
    </div>
  );
};

export default SmallStatCard;
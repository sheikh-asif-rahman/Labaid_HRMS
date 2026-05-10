import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}

const PayrollSummaryCard = ({
  title,
  value,
  subtitle,
  icon,
}: Props) => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
        min-w-0
      "
    >
      <div
        className="
          flex items-start justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[11px]
              text-zinc-500
              whitespace-nowrap
            "
          >
            {title}
          </p>

          <h2
            className="
              text-xl
              lg:text-2xl
              font-bold
              text-zinc-800
              mt-2
              leading-none
              whitespace-nowrap
            "
          >
            {value}
          </h2>

          <p
            className="
              text-[11px]
              text-zinc-500
              mt-2
              whitespace-nowrap
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            w-10 h-10
            rounded-xl
            bg-zinc-100
            flex items-center justify-center
            text-zinc-700
            shrink-0
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default PayrollSummaryCard;
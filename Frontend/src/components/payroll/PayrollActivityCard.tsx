import { payrollActivityData } from "../../data/payrollRowTwoData";

const PayrollActivityCard = () => {
  return (
    <div
      className="
        bg-white
        border border-zinc-200
        rounded-2xl
        p-4
      "
    >
      <div className="mb-4">
        <h3
          className="
            text-sm
            font-semibold
            text-zinc-800
          "
        >
          Recent Activity
        </h3>

        <p
          className="
            text-[11px]
            text-zinc-500
            mt-1
          "
        >
          Latest payroll updates
        </p>
      </div>

      <div className="space-y-4">
        {payrollActivityData.map((item) => (
          <div
            key={item.id}
            className="flex gap-3"
          >
            <div
              className="
                w-2 h-2
                rounded-full
                bg-black
                mt-2
                shrink-0
              "
            />

            <div className="min-w-0">
              <h4
                className="
                  text-[11px]
                  font-medium
                  text-zinc-800
                "
              >
                {item.title}
              </h4>

              <p
                className="
                  text-[10px]
                  text-zinc-500
                  mt-1
                "
              >
                {item.description}
              </p>

              <span
                className="
                  text-[10px]
                  text-zinc-400
                  mt-1
                  inline-block
                "
              >
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollActivityCard;
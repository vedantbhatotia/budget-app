"use client";
import { startOfMonth } from "date-fns";
import { UserSettings } from "@prisma/client";
import { useState } from "react";
import { differenceInDays } from "date-fns";
import { toast } from "sonner";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import StatsCards from "./StatsCards";
export default function Overview({ userSettings }: { userSettings: UserSettings }) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <div className="date-range-container relative">
            <DateRangePicker
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
              showCompare={false}
              onUpdate={(values) => {
                const { from, to } = values.range;
                if (!from || !to) return;
                if (differenceInDays(to, from) > 90) {
                  toast.error(
                    `The selected date range is too big. Max allowed range is 90 days!`
                  );
                  return;
                }
                setDateRange({ from, to });
              }}
            />
            <div className="buttons-container flex justify-between p-2 bg-white">
              <button className="btn-cancel">Cancel</button>
              <button className="btn-update">Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex w-full flex-col gap-2">
        <StatsCards
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
        {/* <CategoriesStats
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        /> */}
      </div>
      <style jsx>{`
        .date-range-container {
          max-height: 400px; /* Adjust this value as needed */
          overflow-y: auto;
          padding-bottom: 60px; /* Ensure space for buttons */
          position: relative;
        }
        .buttons-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid #ddd;
        }
        .btn-cancel,
        .btn-update {
          padding: 0.5rem 1rem;
          border: none;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          border-radius: 0.25rem;
        }
        .btn-cancel {
          background-color: #dc3545;
        }
      `}</style>
    </>
  );
}

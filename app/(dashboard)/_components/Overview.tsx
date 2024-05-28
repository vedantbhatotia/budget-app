"use client"
import { startOfMonth } from "date-fns";
import { UserSettings } from "@prisma/client"
import { useState } from "react";
// import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { toast } from "sonner";
import { DateRangePicker } from "@/components/ui/date-range-picker";
export default function Overview({userSettings}:{userSettings:UserSettings}){
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: startOfMonth(new Date()),
        to: new Date(),
    });
    return (
        <>
          <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
            <h2 className="text-3xl font-bold">Overview</h2>
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </>
      );
}
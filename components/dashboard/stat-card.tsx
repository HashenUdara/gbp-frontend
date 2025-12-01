import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  period?: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  period,
  icon,
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const isNeutral = change === 0 || change === undefined;

  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <Card
      className={cn("p-3 sm:p-4 border-border/50 hover:border-border/80", className)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 sm:space-y-1.5 min-w-0">
          <p className="text-[11px] sm:text-[13px] font-normal text-muted-foreground/80 truncate">
            {title}
          </p>
          <p className="text-lg sm:text-[22px] font-semibold tracking-tight text-foreground">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
              <span
                className={cn(
                  "flex items-center text-[10px] sm:text-[11px] font-medium",
                  isPositive && "text-emerald-600/90",
                  isNegative && "text-red-500/90",
                  isNeutral && "text-muted-foreground/70"
                )}
              >
                {isPositive && <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                {isNegative && <ArrowDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                {isNeutral && <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                {Math.abs(change).toFixed(1)}%
              </span>
              {period && (
                <span className="text-[10px] sm:text-[11px] text-muted-foreground/60 hidden xs:inline">
                  {period}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-muted/50 text-muted-foreground/70 shrink-0">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

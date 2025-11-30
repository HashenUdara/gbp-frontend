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
      className={cn("p-4 border-border/50 hover:border-border/80", className)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[13px] font-normal text-muted-foreground/80">
            {title}
          </p>
          <p className="text-[22px] font-semibold tracking-tight text-foreground">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <span
                className={cn(
                  "flex items-center text-[11px] font-medium",
                  isPositive && "text-emerald-600/90",
                  isNegative && "text-red-500/90",
                  isNeutral && "text-muted-foreground/70"
                )}
              >
                {isPositive && <ArrowUp className="h-3 w-3" />}
                {isNegative && <ArrowDown className="h-3 w-3" />}
                {isNeutral && <Minus className="h-3 w-3" />}
                {Math.abs(change).toFixed(1)}%
              </span>
              {period && (
                <span className="text-[11px] text-muted-foreground/60">
                  {period}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-xl bg-muted/50 text-muted-foreground/70">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

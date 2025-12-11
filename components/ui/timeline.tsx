"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineContextValue {
  activeStep: number;
  orientation: "horizontal" | "vertical";
}

const TimelineContext = React.createContext<TimelineContextValue>({
  activeStep: 0,
  orientation: "vertical",
});

interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  defaultValue?: number;
  orientation?: "horizontal" | "vertical";
}

function Timeline({
  defaultValue = 0,
  orientation = "vertical",
  className,
  children,
  ...props
}: TimelineProps) {
  return (
    <TimelineContext.Provider value={{ activeStep: defaultValue, orientation }}>
      <ol
        data-slot="timeline"
        data-orientation={orientation}
        className={cn(
          "group/timeline flex flex-col",
          "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:gap-4",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    </TimelineContext.Provider>
  );
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  step: number;
}

function TimelineItem({
  step,
  className,
  children,
  ...props
}: TimelineItemProps) {
  const { activeStep } = React.useContext(TimelineContext);
  const status =
    step < activeStep
      ? "completed"
      : step === activeStep
      ? "current"
      : "upcoming";

  return (
    <li
      data-slot="timeline-item"
      data-step={step}
      data-status={status}
      data-completed={step <= activeStep ? "" : undefined}
      className={cn(
        "group/timeline-item relative pb-8 last:pb-0",
        "group-data-[orientation=horizontal]/timeline:pb-0 group-data-[orientation=horizontal]/timeline:pr-8 group-data-[orientation=horizontal]/timeline:last:pr-0",
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

function TimelineHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-header"
      className={cn(
        "flex items-center gap-3",
        "group-data-[orientation=horizontal]/timeline:flex-col group-data-[orientation=horizontal]/timeline:items-start",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TimelineSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-separator"
      className={cn(
        "absolute left-3 top-6 h-[calc(100%-1.5rem)] w-px bg-border",
        "group-data-completed/timeline-item:bg-primary/30",
        "group-data-[orientation=horizontal]/timeline:left-6 group-data-[orientation=horizontal]/timeline:top-3 group-data-[orientation=horizontal]/timeline:h-px group-data-[orientation=horizontal]/timeline:w-[calc(100%-1.5rem)]",
        className
      )}
      {...props}
    />
  );
}

function TimelineIndicator({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-indicator"
      className={cn(
        "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground",
        "group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary/10 group-data-completed/timeline-item:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TimelineTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      data-slot="timeline-title"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

function TimelineContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-content"
      className={cn(
        "mt-2 pl-9 text-sm text-muted-foreground",
        "group-data-[orientation=horizontal]/timeline:pl-0 group-data-[orientation=horizontal]/timeline:pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TimelineDate({
  className,
  ...props
}: React.HTMLAttributes<HTMLTimeElement>) {
  return (
    <time
      data-slot="timeline-date"
      className={cn("block text-xs text-muted-foreground/70", className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineSeparator,
  TimelineIndicator,
  TimelineTitle,
  TimelineContent,
  TimelineDate,
};

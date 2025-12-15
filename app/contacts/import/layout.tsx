"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { ImportProvider, useImport } from "./import-context";

const steps = [
  { step: 1, title: "Upload", path: "/contacts/import" },
  { step: 2, title: "Preview", path: "/contacts/import/preview" },
  { step: 3, title: "Complete", path: "/contacts/import/complete" },
];

function StepperNav() {
  const { step } = useImport();
  const pathname = usePathname();
  const router = useRouter();

  // Determine current step from pathname
  const currentStep = steps.find((s) => s.path === pathname)?.step || 1;

  return (
    <div className="mb-8">
      <Stepper value={currentStep}>
        {steps.map(({ step: stepNum, title, path }) => (
          <StepperItem
            className="not-last:flex-1"
            key={stepNum}
            step={stepNum}
            completed={stepNum < currentStep}
          >
            <StepperTrigger
              className="rounded"
              onClick={() => {
                // Only allow going back, not forward
                if (stepNum < currentStep) {
                  router.push(path);
                }
              }}
            >
              <StepperIndicator />
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {stepNum < steps.length && <StepperSeparator className="mx-4" />}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}

export default function ImportLayout({ children }: { children: ReactNode }) {
  return (
    <ImportProvider>
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Import Contacts
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload a CSV file to import contacts in bulk
          </p>
        </div>

        <StepperNav />

        <div className="mt-8">{children}</div>
      </div>
    </ImportProvider>
  );
}

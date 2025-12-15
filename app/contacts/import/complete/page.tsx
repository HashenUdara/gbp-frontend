"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2Icon, UploadIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImport } from "../import-context";

export default function ImportCompletePage() {
  const router = useRouter();
  const { importedCount, invalidRows, fileName, reset } = useImport();

  // Redirect if no import was done
  useEffect(() => {
    if (importedCount === 0) {
      router.replace("/contacts/import");
    }
  }, [importedCount, router]);

  const handleImportMore = () => {
    reset();
    router.push("/contacts/import");
  };

  const handleViewContacts = () => {
    reset();
    router.push("/contacts");
  };

  if (importedCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* Success Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 mb-6">
        <CheckCircle2Icon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold tracking-tight">
        Import Successful!
      </h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Successfully imported {importedCount} contact
        {importedCount !== 1 ? "s" : ""} from{" "}
        <span className="font-medium text-foreground">{fileName}</span>
      </p>

      {/* Stats */}
      <div className="flex items-center gap-6 mt-8">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">
            {importedCount} imported
          </span>
        </div>
        {invalidRows.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-muted-foreground">
              {invalidRows.length} skipped
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-10">
        <Button variant="outline" size="lg" onClick={handleImportMore}>
          <UploadIcon className="h-4 w-4 mr-2" />
          Import More
        </Button>
        <Button size="lg" onClick={handleViewContacts}>
          <UsersIcon className="h-4 w-4 mr-2" />
          View Contacts
        </Button>
      </div>
    </div>
  );
}

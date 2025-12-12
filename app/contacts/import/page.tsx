"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircleIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  PaperclipIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { useImport } from "./import-context";
import { parseCSV, downloadTemplate } from "./csv-utils";

export default function ImportUploadPage() {
  const router = useRouter();
  const { setRows, setFileName, setStep } = useImport();

  const maxSize = 5 * 1024 * 1024; // 5MB

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: ".csv,text/csv",
  });

  const file = files[0];

  const handleContinue = useCallback(async () => {
    if (!file) return;

    const fileData = file.file as File;
    const content = await fileData.text();
    const rows = parseCSV(content);

    if (rows.length === 0) {
      return;
    }

    setRows(rows);
    setFileName(fileData.name);
    setStep(2);
    router.push("/contacts/import/preview");
  }, [file, setRows, setFileName, setStep, router]);

  return (
    <div className="space-y-6">
      {/* Download Template Section */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background border border-border/50">
            <FileSpreadsheetIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Download CSV Template</p>
            <p className="text-xs text-muted-foreground">
              Use our template to ensure correct formatting
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={downloadTemplate}>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      {/* Drop Zone */}
      <div
        className={`flex min-h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/5"
            : file
            ? "border-border bg-muted/20"
            : "border-border/60 hover:border-border hover:bg-muted/20"
        }`}
        onClick={!file ? openFileDialog : undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={-1}
      >
        <input
          {...getInputProps()}
          aria-label="Upload CSV file"
          className="sr-only"
          disabled={Boolean(file)}
        />

        {!file ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background">
              <UploadIcon className="size-6 text-muted-foreground" />
            </div>
            <p className="mb-1 font-medium">Drop your CSV file here</p>
            <p className="text-muted-foreground text-sm">
              or click to browse (max {formatBytes(maxSize)})
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-background">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <PaperclipIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-sm">
                    {(file.file as File).name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes((file.file as File).size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.id);
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div
          className="flex items-center gap-2 text-destructive text-sm"
          role="alert"
        >
          <AlertCircleIcon className="h-4 w-4 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button
          size="lg"
          disabled={!file}
          onClick={handleContinue}
          className="min-w-32"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

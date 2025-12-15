"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircleIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  Loader2Icon,
  PaperclipIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { useImport } from "./import-context";
import { parseCSVFile, downloadTemplate, ParseCSVResult } from "./csv-utils";

export default function ImportUploadPage() {
  const router = useRouter();
  const { setRows, setFileName, setStep } = useImport();
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseErrors, setParseErrors] = useState<string[]>([]);

  const maxSize = 10 * 1024 * 1024; // 10MB - increased for larger imports

  const [
    { files, isDragging, errors: uploadErrors },
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

  // Combined errors from upload and parsing
  const allErrors = [...uploadErrors, ...parseErrors];

  const handleContinue = useCallback(async () => {
    if (!file || isProcessing) return;

    setIsProcessing(true);
    setParseErrors([]);

    try {
      const fileData = file.file as File;

      // Use streaming parser for better performance with large files
      const result: ParseCSVResult = await parseCSVFile(fileData);

      // Handle parsing errors
      if (!result.success) {
        setParseErrors(result.errors);
        setIsProcessing(false);
        return;
      }

      // Check if we have any valid rows
      if (result.rows.length === 0) {
        setParseErrors(["No valid data rows found in the CSV file"]);
        setIsProcessing(false);
        return;
      }

      // Success - proceed to preview
      setRows(result.rows);
      setFileName(fileData.name);
      setStep(2);
      router.push("/contacts/import/preview");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to parse CSV file";
      setParseErrors([message]);
    } finally {
      setIsProcessing(false);
    }
  }, [file, isProcessing, setRows, setFileName, setStep, router]);

  // Clear parse errors when file changes
  const handleRemoveFile = useCallback(
    (id: string) => {
      removeFile(id);
      setParseErrors([]);
    },
    [removeFile]
  );

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
        className={`flex min-h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
          isProcessing
            ? "border-border bg-muted/20 cursor-wait"
            : isDragging
            ? "border-primary bg-primary/5 cursor-pointer"
            : file
            ? "border-border bg-muted/20"
            : "border-border/60 hover:border-border hover:bg-muted/20 cursor-pointer"
        }`}
        onClick={!file && !isProcessing ? openFileDialog : undefined}
        onDragEnter={!isProcessing ? handleDragEnter : undefined}
        onDragLeave={!isProcessing ? handleDragLeave : undefined}
        onDragOver={!isProcessing ? handleDragOver : undefined}
        onDrop={!isProcessing ? handleDrop : undefined}
        role="button"
        tabIndex={-1}
      >
        <input
          {...getInputProps()}
          aria-label="Upload CSV file"
          className="sr-only"
          disabled={Boolean(file) || isProcessing}
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
                  handleRemoveFile(file.id);
                }}
                disabled={isProcessing}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Errors */}
      {allErrors.length > 0 && (
        <div
          className="flex flex-col gap-1 p-3 rounded-lg border border-destructive/30 bg-destructive/5"
          role="alert"
        >
          {allErrors.map((error, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <AlertCircleIcon className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />
              <span className="text-destructive">{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button
          size="lg"
          disabled={!file || isProcessing}
          onClick={handleContinue}
          className="min-w-32"
        >
          {isProcessing ? (
            <>
              <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
}

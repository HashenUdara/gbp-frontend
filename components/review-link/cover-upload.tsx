"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";

interface CoverUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

export function CoverUpload({ value, onChange }: CoverUploadProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

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
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview || value || null;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (files[0]?.id) {
      removeFile(files[0].id);
    }
    onChange?.("");
  };

  // Update parent when file is selected
  if (files[0]?.preview && files[0].preview !== value) {
    onChange?.(files[0].preview);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          className={`relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors cursor-pointer ${
            isDragging
              ? "border-emerald-500 bg-emerald-500/10"
              : previewUrl
              ? "border-transparent"
              : "border-white/20 hover:bg-white/5"
          }`}
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={-1}
        >
          <input
            {...getInputProps()}
            aria-label="Upload file"
            className="sr-only"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <img
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
                src={previewUrl}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                aria-hidden="true"
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-800"
              >
                <ImageUpIcon className="size-4 text-zinc-400" />
              </div>
              <p className="mb-1.5 font-medium text-sm text-white">
                Drop your image here or click to browse
              </p>
              <p className="text-zinc-500 text-xs">Max size: {maxSizeMB}MB</p>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              aria-label="Remove image"
              className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-colors hover:bg-black/80"
              onClick={handleRemove}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-red-400 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}

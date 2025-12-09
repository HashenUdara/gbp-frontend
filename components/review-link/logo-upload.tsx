"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

interface LogoUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || value || null;

  // When file changes, call onChange with the preview URL
  const handleRemove = () => {
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
    <div className="flex flex-col items-start gap-3">
      <div className="relative inline-flex">
        <Button
          aria-label={previewUrl ? "Change logo" : "Upload logo"}
          className="relative size-20 overflow-hidden rounded-2xl p-0 shadow-none border-white/10 hover:border-white/20 bg-zinc-800 hover:bg-zinc-700"
          onClick={openFileDialog}
          variant="outline"
          type="button"
        >
          {previewUrl ? (
            <img
              alt="Logo preview"
              className="size-full object-cover"
              src={previewUrl}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-6 text-zinc-500" />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            aria-label="Remove logo"
            className="-top-2 -right-2 absolute size-6 rounded-full bg-zinc-700 hover:bg-zinc-600 border-2 border-zinc-900 shadow-none"
            onClick={handleRemove}
            size="icon"
            type="button"
          >
            <XIcon className="size-3.5 text-white" />
          </Button>
        )}
        <input
          {...getInputProps()}
          aria-label="Upload logo file"
          className="sr-only"
          tabIndex={-1}
        />
      </div>
      <p className="text-xs text-zinc-500">
        PNG, JPG up to 2MB. Recommended: 200×200px
      </p>
    </div>
  );
}

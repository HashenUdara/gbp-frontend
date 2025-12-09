"use client";

import { useCallback, useRef, useState } from "react";

interface FileWithPreview {
  id: string;
  file: File;
  preview: string | null;
}

interface UseFileUploadOptions {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

interface UseFileUploadState {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
}

interface UseFileUploadActions {
  handleDragEnter: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  openFileDialog: () => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  getInputProps: () => {
    type: "file";
    accept?: string;
    multiple?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ref: React.RefObject<HTMLInputElement>;
  };
}

export function useFileUpload(
  options: UseFileUploadOptions = {}
): [UseFileUploadState, UseFileUploadActions] {
  const { accept, maxSize, multiple = false } = options;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1);
        return `File size must be less than ${maxSizeMB}MB`;
      }
      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        const fileType = file.type;
        const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension === type.toLowerCase();
          }
          if (type.endsWith("/*")) {
            return fileType.startsWith(type.replace("/*", "/"));
          }
          return fileType === type;
        });

        if (!isAccepted) {
          return `File type not accepted. Accepted types: ${accept}`;
        }
      }
      return null;
    },
    [accept, maxSize]
  );

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const newErrors: string[] = [];
      const newFiles: FileWithPreview[] = [];

      const filesToProcess = multiple
        ? Array.from(fileList)
        : [fileList[0]].filter(Boolean);

      filesToProcess.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
        } else {
          const preview = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null;
          newFiles.push({
            id: generateId(),
            file,
            preview,
          });
        }
      });

      setErrors(newErrors);

      if (newFiles.length > 0) {
        setFiles((prev) => {
          // Clean up old previews
          prev.forEach((f) => {
            if (f.preview) URL.revokeObjectURL(f.preview);
          });
          return multiple ? [...prev, ...newFiles] : newFiles;
        });
      }
    },
    [multiple, validateFile]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      return [];
    });
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      // Reset the input so the same file can be selected again
      if (inputRef.current) inputRef.current.value = "";
    },
    [processFiles]
  );

  const getInputProps = useCallback(
    () => ({
      type: "file" as const,
      accept,
      multiple,
      onChange: handleInputChange,
      ref: inputRef,
    }),
    [accept, multiple, handleInputChange]
  );

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ];
}

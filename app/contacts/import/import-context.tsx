"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Contact } from "../types";

// CSV row before validation
export interface ImportRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  isValid: boolean;
  errors: string[];
}

// Import state
interface ImportState {
  step: number;
  rows: ImportRow[];
  fileName: string | null;
  importedCount: number;
}

interface ImportContextValue extends ImportState {
  setStep: (step: number) => void;
  setRows: (rows: ImportRow[]) => void;
  setFileName: (name: string | null) => void;
  setImportedCount: (count: number) => void;
  updateRow: (id: string, data: Partial<ImportRow>) => void;
  deleteRow: (id: string) => void;
  reset: () => void;
  validRows: ImportRow[];
  invalidRows: ImportRow[];
}

const STORAGE_KEY = "contact-import-state";

const initialState: ImportState = {
  step: 1,
  rows: [],
  fileName: null,
  importedCount: 0,
};

const ImportContext = createContext<ImportContextValue | undefined>(undefined);

export function ImportProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ImportState>(initialState);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore errors
    }
  }, [state]);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setRows = useCallback((rows: ImportRow[]) => {
    setState((prev) => ({ ...prev, rows }));
  }, []);

  const setFileName = useCallback((fileName: string | null) => {
    setState((prev) => ({ ...prev, fileName }));
  }, []);

  const setImportedCount = useCallback((importedCount: number) => {
    setState((prev) => ({ ...prev, importedCount }));
  }, []);

  const updateRow = useCallback((id: string, data: Partial<ImportRow>) => {
    setState((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => (row.id === id ? { ...row, ...data } : row)),
    }));
  }, []);

  const deleteRow = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      rows: prev.rows.filter((row) => row.id !== id),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const validRows = state.rows.filter((row) => row.isValid);
  const invalidRows = state.rows.filter((row) => !row.isValid);

  return (
    <ImportContext.Provider
      value={{
        ...state,
        setStep,
        setRows,
        setFileName,
        setImportedCount,
        updateRow,
        deleteRow,
        reset,
        validRows,
        invalidRows,
      }}
    >
      {children}
    </ImportContext.Provider>
  );
}

export function useImport() {
  const context = useContext(ImportContext);
  if (!context) {
    throw new Error("useImport must be used within ImportProvider");
  }
  return context;
}

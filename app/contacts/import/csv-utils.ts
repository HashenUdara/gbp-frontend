/**
 * CSV Utilities for Contact Import
 *
 * Uses PapaParse for robust, industry-standard CSV parsing with:
 * - Proper handling of quoted fields, newlines, and escaped characters
 * - Auto-detection of delimiters
 * - Streaming support for large files
 * - Comprehensive error handling
 */

import Papa, { ParseResult, ParseError } from "papaparse";
import { ImportRow } from "./import-context";

// ============================================================================
// Constants
// ============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Header name mappings (normalized lowercase -> expected field)
const HEADER_MAPPINGS: Record<string, keyof CSVRow> = {
  firstname: "firstName",
  first_name: "firstName",
  "first name": "firstName",
  lastname: "lastName",
  last_name: "lastName",
  "last name": "lastName",
  email: "email",
  "email address": "email",
  emailaddress: "email",
  telephone: "telephone",
  phone: "telephone",
  phone_number: "telephone",
  phonenumber: "telephone",
  "phone number": "telephone",
  mobile: "telephone",
};

// ============================================================================
// Types
// ============================================================================

/** Raw CSV row with string values */
interface CSVRow {
  firstName?: string;
  lastName?: string;
  email?: string;
  telephone?: string;
}

/** Validation result for a single row */
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/** Parse result returned to consumers */
export interface ParseCSVResult {
  success: boolean;
  rows: ImportRow[];
  errors: string[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates a single row and returns validation result
 */
export function validateRow(
  row: Partial<
    Pick<ImportRow, "firstName" | "lastName" | "email" | "telephone">
  >
): ValidationResult {
  const errors: string[] = [];

  // Required: firstName
  if (!row.firstName?.trim()) {
    errors.push("First name is required");
  }

  // Required: email with format validation
  if (!row.email?.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(row.email.trim())) {
    errors.push("Invalid email format");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates a unique ID for a row
 */
function generateRowId(index: number): string {
  return `row-${index}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
}

// ============================================================================
// Header Normalization
// ============================================================================

/**
 * Normalizes header names to expected field names
 */
function normalizeHeaders(headers: string[]): Map<number, keyof CSVRow> {
  const mapping = new Map<number, keyof CSVRow>();

  headers.forEach((header, index) => {
    const normalized = header.toLowerCase().trim();
    const fieldName = HEADER_MAPPINGS[normalized];

    if (fieldName) {
      mapping.set(index, fieldName);
    }
  });

  return mapping;
}

/**
 * Extracts field value from raw row data using header mapping
 */
function extractField(
  rowData: string[],
  fieldName: keyof CSVRow,
  headerMapping: Map<number, keyof CSVRow>
): string {
  for (const [index, field] of headerMapping.entries()) {
    if (field === fieldName && rowData[index] !== undefined) {
      return rowData[index].trim();
    }
  }
  return "";
}

// ============================================================================
// CSV Parsing
// ============================================================================

/**
 * Parses CSV content into ImportRow objects with validation
 *
 * @param csvContent - Raw CSV string content
 * @returns ParseCSVResult with parsed rows and metadata
 */
export function parseCSV(csvContent: string): ParseCSVResult {
  const result: ParseCSVResult = {
    success: false,
    rows: [],
    errors: [],
    totalRows: 0,
    validRows: 0,
    invalidRows: 0,
  };

  // Handle empty content
  if (!csvContent?.trim()) {
    result.errors.push("CSV content is empty");
    return result;
  }

  // Parse CSV using PapaParse
  const parseResult: ParseResult<string[]> = Papa.parse(csvContent, {
    skipEmptyLines: true,
    // Don't use header mode - we handle header normalization ourselves
    // for better flexibility with different header formats
  });

  // Handle parse errors
  if (parseResult.errors.length > 0) {
    parseResult.errors.forEach((error: ParseError) => {
      result.errors.push(`Row ${error.row}: ${error.message}`);
    });
  }

  const data = parseResult.data;

  // Need at least header row + 1 data row
  if (data.length < 2) {
    result.errors.push(
      "CSV must contain a header row and at least one data row"
    );
    return result;
  }

  // Extract and normalize headers
  const headers = data[0];
  const headerMapping = normalizeHeaders(headers);

  // Validate required headers are present
  const hasFirstName = Array.from(headerMapping.values()).includes("firstName");
  const hasEmail = Array.from(headerMapping.values()).includes("email");

  if (!hasFirstName) {
    result.errors.push("CSV must contain a 'firstName' or 'first_name' column");
  }
  if (!hasEmail) {
    result.errors.push("CSV must contain an 'email' column");
  }

  if (!hasFirstName || !hasEmail) {
    return result;
  }

  // Parse data rows
  for (let i = 1; i < data.length; i++) {
    const rowData = data[i];

    // Skip completely empty rows
    if (rowData.every((cell) => !cell?.trim())) {
      continue;
    }

    const firstName = extractField(rowData, "firstName", headerMapping);
    const lastName = extractField(rowData, "lastName", headerMapping);
    const email = extractField(rowData, "email", headerMapping);
    const telephone = extractField(rowData, "telephone", headerMapping);

    const validation = validateRow({ firstName, lastName, email, telephone });

    const importRow: ImportRow = {
      id: generateRowId(i),
      firstName,
      lastName,
      email,
      telephone,
      isValid: validation.isValid,
      errors: validation.errors,
    };

    result.rows.push(importRow);
    result.totalRows++;

    if (validation.isValid) {
      result.validRows++;
    } else {
      result.invalidRows++;
    }
  }

  result.success = result.rows.length > 0;
  return result;
}

/**
 * Parses CSV file asynchronously with streaming support for large files
 *
 * @param file - File object from file input
 * @returns Promise resolving to ParseCSVResult
 */
export function parseCSVFile(file: File): Promise<ParseCSVResult> {
  return new Promise((resolve) => {
    const result: ParseCSVResult = {
      success: false,
      rows: [],
      errors: [],
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
    };

    let headers: string[] = [];
    let headerMapping: Map<number, keyof CSVRow> = new Map();
    let rowIndex = 0;
    let isFirstRow = true;

    Papa.parse(file, {
      skipEmptyLines: true,
      step: (row) => {
        const rowData = row.data as string[];

        if (isFirstRow) {
          // First row is headers
          headers = rowData;
          headerMapping = normalizeHeaders(headers);
          isFirstRow = false;

          // Validate required headers
          const hasFirstName = Array.from(headerMapping.values()).includes(
            "firstName"
          );
          const hasEmail = Array.from(headerMapping.values()).includes("email");

          if (!hasFirstName) {
            result.errors.push(
              "CSV must contain a 'firstName' or 'first_name' column"
            );
          }
          if (!hasEmail) {
            result.errors.push("CSV must contain an 'email' column");
          }
          return;
        }

        // Skip if header validation failed
        if (result.errors.length > 0) return;

        // Skip empty rows
        if (rowData.every((cell) => !cell?.trim())) return;

        rowIndex++;

        const firstName = extractField(rowData, "firstName", headerMapping);
        const lastName = extractField(rowData, "lastName", headerMapping);
        const email = extractField(rowData, "email", headerMapping);
        const telephone = extractField(rowData, "telephone", headerMapping);

        const validation = validateRow({
          firstName,
          lastName,
          email,
          telephone,
        });

        const importRow: ImportRow = {
          id: generateRowId(rowIndex),
          firstName,
          lastName,
          email,
          telephone,
          isValid: validation.isValid,
          errors: validation.errors,
        };

        result.rows.push(importRow);
        result.totalRows++;

        if (validation.isValid) {
          result.validRows++;
        } else {
          result.invalidRows++;
        }
      },
      complete: () => {
        result.success = result.rows.length > 0 && result.errors.length === 0;
        resolve(result);
      },
      error: (error) => {
        result.errors.push(`Parse error: ${error.message}`);
        resolve(result);
      },
    });
  });
}

// ============================================================================
// Template Generation
// ============================================================================

/** Template row for download */
const TEMPLATE_HEADERS = ["firstName", "lastName", "email", "telephone"];
const TEMPLATE_EXAMPLES = [
  ["John", "Doe", "john.doe@example.com", "+1234567890"],
  ["Jane", "Smith", "jane.smith@example.com", "+0987654321"],
];

/**
 * Generates CSV template content
 */
export function generateTemplate(): string {
  return Papa.unparse({
    fields: TEMPLATE_HEADERS,
    data: TEMPLATE_EXAMPLES,
  });
}

/**
 * Downloads CSV template file
 */
export function downloadTemplate(): void {
  const content = generateTemplate();
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "contacts_import_template.csv");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

// ============================================================================
// Exports Summary
// ============================================================================

export type { CSVRow, ValidationResult };

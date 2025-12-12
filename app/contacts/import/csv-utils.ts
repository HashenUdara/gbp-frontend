import { ImportRow } from "./import-context";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single row and return updated isValid and errors
 */
export function validateRow(row: Partial<ImportRow>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!row.firstName) {
    errors.push("First name is required");
  }

  if (!row.email) {
    errors.push("Email is required");
  } else if (!EMAIL_REGEX.test(row.email)) {
    errors.push("Invalid email format");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Parse CSV content into ImportRow objects with validation
 */
export function parseCSV(csvContent: string): ImportRow[] {
  const lines = csvContent.trim().split("\n");

  if (lines.length < 2) {
    return [];
  }

  // Parse header row
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

  // Validate expected headers
  const expectedHeaders = ["firstname", "lastname", "email", "telephone"];
  const hasExpectedHeaders = expectedHeaders.every(
    (h) => headers.includes(h) || headers.includes(h.replace("name", "_name"))
  );

  // Find column indices
  const firstNameIdx = headers.findIndex(
    (h) => h === "firstname" || h === "first_name" || h === "first name"
  );
  const lastNameIdx = headers.findIndex(
    (h) => h === "lastname" || h === "last_name" || h === "last name"
  );
  const emailIdx = headers.findIndex((h) => h === "email");
  const telephoneIdx = headers.findIndex(
    (h) => h === "telephone" || h === "phone" || h === "phone_number"
  );

  const rows: ImportRow[] = [];

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const errors: string[] = [];

    const firstName =
      firstNameIdx >= 0 ? values[firstNameIdx]?.trim() || "" : "";
    const lastName = lastNameIdx >= 0 ? values[lastNameIdx]?.trim() || "" : "";
    const email = emailIdx >= 0 ? values[emailIdx]?.trim() || "" : "";
    const telephone =
      telephoneIdx >= 0 ? values[telephoneIdx]?.trim() || "" : "";

    // Validate required fields
    if (!firstName) {
      errors.push("First name is required");
    }

    if (!email) {
      errors.push("Email is required");
    } else if (!EMAIL_REGEX.test(email)) {
      errors.push("Invalid email format");
    }

    rows.push({
      id: `row-${i}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      email,
      telephone,
      isValid: errors.length === 0,
      errors,
    });
  }

  return rows;
}

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

/**
 * Generate CSV template content
 */
export function generateTemplate(): string {
  return `firstName,lastName,email,telephone
John,Doe,john.doe@example.com,+1234567890
Jane,Smith,jane.smith@example.com,+0987654321`;
}

/**
 * Download a CSV file
 */
export function downloadTemplate() {
  const content = generateTemplate();
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "contacts_template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/data-table";
import { useImport, ImportRow } from "../import-context";
import { getImportPreviewColumns } from "./columns";
import { validateRow } from "../csv-utils";

export default function ImportPreviewPage() {
  const router = useRouter();
  const {
    rows,
    validRows,
    invalidRows,
    setStep,
    setImportedCount,
    updateRow,
    deleteRow,
  } = useImport();

  // Edit dialog state
  const [editingRow, setEditingRow] = useState<ImportRow | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
  });

  // Redirect if no data
  useEffect(() => {
    if (rows.length === 0) {
      router.replace("/contacts/import");
    }
  }, [rows, router]);

  // Open edit dialog
  const handleEdit = (row: ImportRow) => {
    setEditingRow(row);
    setEditForm({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      telephone: row.telephone,
    });
  };

  // Save edit
  const handleSaveEdit = () => {
    if (!editingRow) return;

    const validation = validateRow(editForm);
    updateRow(editingRow.id, {
      ...editForm,
      ...validation,
    });
    setEditingRow(null);
  };

  // Delete row
  const handleDelete = (id: string) => {
    deleteRow(id);
  };

  const handleImport = () => {
    setImportedCount(validRows.length);
    setStep(3);
    router.push("/contacts/import/complete");
  };

  const handleBack = () => {
    router.push("/contacts/import");
  };

  // Memoize columns with actions
  const columns = useMemo(
    () =>
      getImportPreviewColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
          <p className="text-2xl font-semibold">{rows.length}</p>
          <p className="text-sm text-muted-foreground">Total Rows</p>
        </div>
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
          <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
            {validRows.length}
          </p>
          <p className="text-sm text-muted-foreground">Valid</p>
        </div>
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5">
          <p className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
            {invalidRows.length}
          </p>
          <p className="text-sm text-muted-foreground">Invalid</p>
        </div>
      </div>

      {/* Errors Alert */}
      {invalidRows.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
          <AlertCircleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-700 dark:text-amber-300">
              {invalidRows.length} row{invalidRows.length > 1 ? "s" : ""} have
              validation errors
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the menu on invalid rows to edit or delete them.
            </p>
          </div>
        </div>
      )}

      {/* Data Table with sorting and pagination */}
      <DataTable
        columns={columns}
        data={rows}
        toolbarConfig={{
          searchColumn: "email",
          searchPlaceholder: "Search by email...",
          filters: [
            {
              column: "isValid",
              title: "Status",
              options: [
                { label: "Valid", value: "true" },
                { label: "Invalid", value: "false" },
              ],
            },
          ],
        }}
      />

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={handleImport}
          disabled={validRows.length === 0}
          className="min-w-40"
        >
          Import {validRows.length} Contact{validRows.length !== 1 ? "s" : ""}
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingRow}
        onOpenChange={(open) => !open && setEditingRow(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update the contact information. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={editForm.firstName}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="John"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={editForm.lastName}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, lastName: e.target.value }))
                }
                placeholder="Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telephone">Telephone</Label>
              <Input
                id="telephone"
                value={editForm.telephone}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    telephone: e.target.value,
                  }))
                }
                placeholder="+1234567890"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingRow(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

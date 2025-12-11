"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DataTable } from "@/components/data-table";

import { Contact } from "./types";
import { sampleContacts, sourceOptions, statusOptions } from "./data";
import { getColumns } from "./columns";
import { ContactDialog } from "./contact-dialog";
import { ContactSheet } from "./contact-sheet";

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>(sampleContacts);

  // Dialog state for add/edit
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingContact, setEditingContact] = React.useState<Contact | null>(
    null
  );

  // Sheet state for viewing contact details
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [viewingContact, setViewingContact] = React.useState<Contact | null>(
    null
  );

  const handleAddContact = () => {
    setEditingContact(null);
    setDialogOpen(true);
  };

  // Row click opens the sheet to view details
  const handleViewContact = (contact: Contact) => {
    setViewingContact(contact);
    setSheetOpen(true);
  };

  // Edit from row actions or sheet
  const handleEditContact = (contact: Contact) => {
    setSheetOpen(false);
    setEditingContact(contact);
    setDialogOpen(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    setContacts((prev) => prev.filter((c) => c.id !== contact.id));
  };

  const handleSaveContact = (
    data: Omit<
      Contact,
      "id" | "addedDate" | "timeline" | "reviewCount" | "lastActivity"
    > & { id?: string }
  ) => {
    if (data.id) {
      // Editing existing contact
      setContacts((prev) =>
        prev.map((c) =>
          c.id === data.id
            ? { ...c, ...data, addedDate: c.addedDate, timeline: c.timeline }
            : c
        )
      );
    } else {
      // Adding new contact
      const newContact: Contact = {
        ...data,
        id: crypto.randomUUID(),
        addedDate: new Date(),
        reviewCount: 0,
        timeline: [
          {
            id: crypto.randomUUID(),
            type: "added",
            title: "Contact Added",
            description: `Added manually via the contacts page`,
            timestamp: new Date(),
          },
        ],
      };
      setContacts((prev) => [newContact, ...prev]);
    }
  };

  const columns = React.useMemo(
    () => getColumns(handleEditContact, handleDeleteContact),
    []
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Contacts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
              <p className="text-muted-foreground">
                Manage your contacts and track their review journey.
              </p>
            </div>
            <Button onClick={handleAddContact} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>

          {/* Data Table */}
          <DataTable
            columns={columns}
            data={contacts}
            onRowClick={handleViewContact}
            toolbarConfig={{
              searchColumn: "name",
              searchPlaceholder: "Search contacts...",
              filters: [
                {
                  column: "source",
                  title: "Source",
                  options: sourceOptions.map((s) => ({
                    label: s.label,
                    value: s.value,
                    icon: s.icon,
                  })),
                },
                {
                  column: "status",
                  title: "Status",
                  options: statusOptions.map((s) => ({
                    label: s.label,
                    value: s.value,
                    icon: s.icon,
                  })),
                },
              ],
            }}
          />
        </div>

        {/* Contact Dialog for Add/Edit */}
        <ContactDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          contact={editingContact}
          onSave={handleSaveContact}
        />

        {/* Contact Sheet for Viewing Details */}
        <ContactSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          contact={viewingContact}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

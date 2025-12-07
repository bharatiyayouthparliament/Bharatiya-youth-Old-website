import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import useCrud from '@/hooks/useCrud';
import { Users, Trash2, Eye, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SearchFilter from '@/components/admin/SearchFilter';
import Pagination from '@/components/admin/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { exportToCSV } from '@/utils/csv';

const RegistrationDataPage = () => {
  const { toast } = useToast();
  const { items: registrations, loading, deleteItem } = useCrud('registrations');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleView = (registration) => {
    setCurrentItem(registration);
    setDialogOpen(true);
  };

  const handleDelete = (registration) => {
    setItemToDelete(registration);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const result = await deleteItem(itemToDelete.id);
      if (!result.error) {
        toast({
          title: "Registration Deleted",
          description: `Deleted: ${itemToDelete.fullName}`,
        });
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    }
    setConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleExport = () => {
    exportToCSV(filteredItems, "registrations");
    toast({ title: "Export Successful", description: "CSV downloaded." });
  };

  // SEARCHABLE FIELDS
  const searchKeys = ["fullName", "email", "college", "registrationType"];

  // FILTER CONFIG
  const filterConfig = [
    {
      key: "registrationType",
      label: "Registration Type",
      placeholder: "Select type",
      options: [
        { value: "PARTICIPANT", label: "Participant" },
        { value: "GLOBAL_SUMMIT", label: "Global Summit" },
        { value: "MP", label: "MP" },
      ],
    },
    {
      key: 'college',
      label: 'College',
      placeholder: 'Filter by college',
      dynamic: true,
      options: [] // PREVENT CRASH
    },
  ];

  return (
    <AdminLayout>
      <Helmet>
        <title>Registrations - Admin</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-poppins flex items-center">
          <Users className="mr-3" /> Registrations
        </h1>

        <Button onClick={handleExport} className="bg-[#a0291f] hover:bg-[#7a1f17]">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <SearchFilter
          items={registrations}
          searchKeys={searchKeys}
          filterConfig={filterConfig}
          onFilter={setFilteredItems}
          onItemsPerPageChange={setItemsPerPage}
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Reg. Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                paginatedItems.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell>{reg.tokenNumber || "—"}</TableCell>
                    <TableCell className="font-medium">{reg.fullName}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{reg.college === "Other" ? reg.otherCollege : reg.college}</TableCell>
                    <TableCell>{reg.registrationType}</TableCell>

                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleView(reg)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(reg)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* VIEW DETAILS */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>
              Full details for {currentItem?.fullName}
            </DialogDescription>
          </DialogHeader>

          {currentItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm py-4">

              {Object.entries(currentItem)
                .filter(([key, value]) => value !== "" && value !== null && value !== undefined)
                .map(([key, value]) => {
                  let label = (key || "")
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase());

                  if (["photoUrl", "videoUrl", "idProof"].includes(key)) {
                    value = value ? "Uploaded ✔" : "Not Uploaded ✘";
                  }

                  if (key === "termsAccepted") {
                    value = value ? "Accepted ✔" : "Not Accepted";
                  }

                  return (
                    <p key={key} className="border p-2 rounded bg-gray-50">
                      <strong className="font-semibold">{label}:</strong>{" "}
                      <span className="text-gray-700">{value.toString()}</span>
                    </p>
                  );
                })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={confirmDelete}
        title="Are you sure?"
        description={`This will permanently delete ${itemToDelete?.fullName}.`}
      />
    </AdminLayout>
  );
};

export default RegistrationDataPage;

import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Helmet } from "react-helmet";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import useCrud from "@/hooks/useCrud";
import { Speaker, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import SpeakerForm from "@/components/admin/SpeakerForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchFilter from "@/components/admin/SearchFilter";
import Pagination from "@/components/admin/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const SpeakerManagementPage = () => {
  const { toast } = useToast();
  const { items: speakers, loading, addItem, updateItem, deleteItem } = useCrud("speakers");

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
  }, [currentPage, itemsPerPage, filteredItems]);

  const handleAdd = () => {
    setCurrentItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const res = await deleteItem(itemToDelete.id);
      if (!res.error) {
        toast({
          title: "Speaker Deleted",
          description: `"${itemToDelete.name}" removed successfully.`,
        });
      }
    }
    setItemToDelete(null);
    setConfirmOpen(false);
  };

  const handleFormSubmit = async (data) => {
    const result = currentItem
      ? await updateItem(currentItem.id, data)
      : await addItem(data);

    if (!result.error) {
      toast({
        title: currentItem ? "Speaker Updated" : "Speaker Added",
        description: `"${data.name}" saved successfully.`,
      });
      setDialogOpen(false);
    }
  };

  const searchKeys = ["name", "designation"];
  const filterConfig = [
    {
      key: "category",
      label: "Category",
      options: [
        { value: "social_activism", label: "Social Activism" },
        { value: "education", label: "Education" },
        { value: "youth_empowerment", label: "Youth Empowerment" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  return (
    <AdminLayout>
      <Helmet>
        <title>Speaker Management</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-poppins font-bold flex items-center">
          <Speaker className="mr-3" /> Speaker Management
        </h1>
        <Button onClick={handleAdd} className="bg-[#a0291f] hover:bg-[#7a1f17]">
          <Plus className="mr-2 h-4 w-4" /> Add Speaker
        </Button>
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg">
        <SearchFilter
          items={speakers}
          searchKeys={searchKeys}
          filterConfig={filterConfig}
          onFilter={setFilteredItems}
          onItemsPerPageChange={setItemsPerPage}
        />

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedItems.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <img
                          src={s.photo_url}
                          className="h-12 w-12 rounded-full object-cover"
                          alt={s.name}
                        />
                      </TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.designation}</TableCell>
                      <TableCell>
                        <Badge className="capitalize" variant="outline">
                          {s.category.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(s)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(s)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
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

      {/* FORM DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentItem ? "Edit Speaker" : "Add Speaker"}</DialogTitle>
            <DialogDescription>
              {currentItem ? "Modify speaker details" : "Add a new speaker"}
            </DialogDescription>
          </DialogHeader>

          <SpeakerForm
            onSubmit={handleFormSubmit}
            initialData={currentItem}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete Speaker?"
        description={`This will permanently delete "${itemToDelete?.name}".`}
      />
    </AdminLayout>
  );
};

export default SpeakerManagementPage;

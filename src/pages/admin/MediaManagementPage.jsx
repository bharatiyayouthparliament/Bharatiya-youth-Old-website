import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Helmet } from "react-helmet";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import useCrud from "@/hooks/useCrud";
import { Video, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import MediaForm from "@/components/admin/MediaForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchFilter from "@/components/admin/SearchFilter";
import Pagination from "@/components/admin/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const MediaManagementPage = () => {
  const { toast } = useToast();
  const {
    items: media,
    loading,
    addItem,
    updateItem,
    deleteItem,
  } = useCrud("media");

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

  const handleAddNew = () => {
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
      const result = await deleteItem(itemToDelete.id);

      if (!result.error) {
        toast({
          title: "Media Deleted",
          description: `"${itemToDelete.caption}" has been removed.`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    setConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleFormSubmit = async (values) => {
    const result = currentItem
      ? await updateItem(currentItem.id, values)
      : await addItem(values);

    if (!result.error) {
      toast({
        title: currentItem ? "Media Updated" : "Media Added",
        description: `"${values.caption}" saved successfully.`,
      });
      setDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const searchKeys = ["caption", "description"];

  return (
    <AdminLayout>
      <Helmet>
        <title>Media Management - Admin</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-poppins flex items-center">
          <Video className="mr-3" /> Media Management
        </h1>

        <Button
          onClick={handleAddNew}
          className="bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Media
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <SearchFilter
          items={media}
          searchKeys={searchKeys}
          filterConfig={[]}
          onFilter={setFilteredItems}
          onItemsPerPageChange={setItemsPerPage}
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Caption</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={item.file_url}
                          alt={item.caption}
                          className="h-10 w-16 object-cover rounded-md"
                        />
                      </TableCell>

                      <TableCell className="font-medium max-w-xs truncate">
                        {item.caption}
                      </TableCell>

                      <TableCell className="max-w-xs truncate">
                        {item.description || "N/A"}
                      </TableCell>

                      <TableCell>
                        {new Date(
                          item.created_at || Date.now()
                        ).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleDelete(item)}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentItem ? "Edit Media" : "Add New Media"}
            </DialogTitle>

            <DialogDescription>
              {currentItem
                ? "Update media details."
                : "Upload a new media file."}
            </DialogDescription>
          </DialogHeader>

          <MediaForm onSubmit={handleFormSubmit} initialData={currentItem} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={confirmDelete}
        title="Are you sure?"
        description={`This will permanently delete "${itemToDelete?.caption}". This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default MediaManagementPage;

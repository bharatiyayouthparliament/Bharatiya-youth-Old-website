import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Helmet } from "react-helmet";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  UserCheck,
  ShieldAlert,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ConfirmDialog from "@/components/admin/ConfirmDialog";
import AdminForm from "@/components/admin/AdminForm";

import useFirestoreAdmins from "@/hooks/useFirestoreAdmins";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchFilter from "@/components/admin/SearchFilter";
import Pagination from "@/components/admin/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const AdminManagementPage = () => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  const {
    admins,
    loading,
    createAdminDoc,
    updateAdmin,
    deleteAdmin,
  } = useFirestoreAdmins();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ================= ROLE-BASED VISIBILITY ==================

const getVisibleAdmins = () => {
  if (!currentUser) return [];

  // Super Admin → see all
  if (currentUser.role === "super_admin") {
    return admins;
  }

  // Master Admin → hide super_admin
  if (currentUser.role === "master_admin") {
    return admins.filter(a => a.role !== "super_admin");
  }

  // Normal Admin → hide master_admin + super_admin
  return admins.filter(
    a => a.role !== "super_admin" && a.role !== "master_admin"
  );
};


useEffect(() => {
  setFilteredItems(getVisibleAdmins());
}, [admins, currentUser]);


  /* ---------------- BLOCK NON-ADMINS ---------------- */
  if (
    !currentUser ||
    (currentUser.role !== "super_admin" &&
      currentUser.role !== "master_admin")
  ) {
    return (
      <AdminLayout>
        <Helmet>
          <title>Access Denied</title>
        </Helmet>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <ShieldAlert className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600">
            You do not have permission to view this page.
          </p>
        </div>
      </AdminLayout>
    );
  }

  /* -------------------- CREATE / UPDATE ADMIN -------------------- */
  const handleFormSubmit = async (formData) => {
    try {
      let uid = currentItem?.id;

      // ----------------------------------------
      // CREATE NEW ADMIN
      // ----------------------------------------
      if (!currentItem) {
        const superEmail = currentUser.email;
        const superPassword = prompt(
          "Enter your password to continue creating admin:"
        );

        if (!superPassword) {
          toast({
            title: "Error",
            description: "Admin creation cancelled.",
            variant: "destructive",
          });
          return;
        }

        // STEP 1: CREATE AUTH USER
        const cred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        uid = cred.user.uid;

        // STEP 2: Immediately log out new user
        await signOut(auth);

        // STEP 3: Log back into super admin
        await signInWithEmailAndPassword(auth, superEmail, superPassword);

        // STEP 4: Write Firestore admin doc
        await createAdminDoc(uid, {
          ...formData,
          created_at: new Date(),
        });

        toast({
          title: "Admin Created",
          description: `${formData.name} added successfully.`,
        });
      }

      // ----------------------------------------
      // UPDATE
      // ----------------------------------------
      else {
        await updateAdmin(uid, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
        });

        toast({
          title: "Admin Updated",
          description: `${formData.name} updated successfully.`,
        });
      }

      setDialogOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  /* -------------------- DELETE ADMIN -------------------- */
  const confirmDelete = async () => {
    await deleteAdmin(itemToDelete.id);

    toast({
      title: "Admin Deleted",
      description: `${itemToDelete.name} removed.`,
    });

    setConfirmOpen(false);
  };

  /* -------------------- TABLE PAGINATION -------------------- */
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredItems.slice(start, start + itemsPerPage);

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Management</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <UserCheck className="mr-3" /> Admin Management
        </h1>

        <Button
          onClick={() => {
            setCurrentItem(null);
            setDialogOpen(true);
          }}
          className="bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Admin
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <SearchFilter
          items={getVisibleAdmins()}
          searchKeys={["name", "email"]}
          filterConfig={[
            {
              key: "role",
              label: "Roles",
              placeholder: "Filter by role",
              options: [
                { value: "admin", label: "Admin" },
                { value: "master_admin", label: "Master Admin" },
                { value: "super_admin", label: "Super Admin" },
              ],
            },
          ]}
          onFilter={setFilteredItems}
          onItemsPerPageChange={setItemsPerPage}
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
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
                : paginated.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className="capitalize">
                          {user.role.replace("_", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {user.created_at
                          ? new Date(
                              user.created_at.seconds * 1000
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentItem(user);
                                setDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setItemToDelete(user);
                                setConfirmOpen(true);
                              }}
                              className="text-red-600"
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

      {/* ADD / EDIT */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentItem ? "Edit Admin" : "Add New Admin"}
            </DialogTitle>
          </DialogHeader>

          <AdminForm
            onSubmit={handleFormSubmit}
            initialData={currentItem}
            existingUsers={admins}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={confirmDelete}
        title="Are you sure?"
        description={`This will permanently delete ${
          itemToDelete?.name || "the admin"
        }.`}
      />
    </AdminLayout>
  );
};

export default AdminManagementPage;

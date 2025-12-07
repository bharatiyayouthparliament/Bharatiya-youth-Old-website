import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import useCrud from '@/hooks/useCrud';
import { MessageSquare, Trash2, Eye, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SearchFilter from '@/components/admin/SearchFilter';
import Pagination from '@/components/admin/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { exportToCSV } from '@/utils/csv';

/* ----------------------------------------------------------
   SAFE DATE FORMATTER (supports Timestamp + String)
----------------------------------------------------------- */
const formatDate = (value) => {
    if (!value) return "—";

    // Firestore Timestamp
    if (value.seconds) {
        return new Date(value.seconds * 1000).toLocaleString();
    }

    // ISO Date String
    if (typeof value === "string") {
        try {
            return new Date(value).toLocaleString();
        } catch {
            return value;
        }
    }

    // JS Date object
    if (value instanceof Date) {
        return value.toLocaleString();
    }

    return "—";
};

const ContactEnquiriesPage = () => {
    const { toast } = useToast();
    const { items: messages, loading, deleteItem } = useCrud('contacts');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const paginatedItems = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredItems, currentPage, itemsPerPage]);

    const handleView = (msg) => {
        setCurrentItem(msg);
        setDialogOpen(true);
    };

    const handleDelete = (msg) => {
        setItemToDelete(msg);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            const result = await deleteItem(itemToDelete.id);
            if (!result.error) {
                toast({ title: "Message Deleted", description: `Message from "${itemToDelete.name}" has been removed.` });
            } else {
                toast({ title: "Error", description: result.error, variant: 'destructive' });
            }
        }
        setConfirmOpen(false);
        setItemToDelete(null);
    };

    const handleExport = () => {
        exportToCSV(filteredItems, 'contact_enquiries');
        toast({ title: "Export Successful", description: "Contact enquiries have been exported to CSV." });
    };

    const searchKeys = ['name', 'email', 'message'];
    const filterConfig = [];

    return (
        <AdminLayout>
            <Helmet><title>Contact Enquiries - Admin</title></Helmet>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-poppins flex items-center">
                    <MessageSquare className="mr-3" /> Contact Enquiries
                </h1>
                <Button onClick={handleExport} className="bg-[#a0291f] hover:bg-[#7a1f17]">
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <SearchFilter
                    items={messages}
                    searchKeys={searchKeys}
                    filterConfig={filterConfig}
                    onFilter={setFilteredItems}
                    onItemsPerPageChange={setItemsPerPage}
                />

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={5}><Skeleton className="h-8 w-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                paginatedItems.map(msg => (
                                    <TableRow key={msg.id}>
                                        <TableCell className="font-medium">{msg.name}</TableCell>
                                        <TableCell>{msg.email}</TableCell>
                                        <TableCell className="max-w-sm truncate">{msg.message}</TableCell>
                                        <TableCell>{formatDate(msg.createdAt)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleView(msg)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(msg)}>
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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Message from {currentItem?.name}</DialogTitle>
                        <DialogDescription>
                            {formatDate(currentItem?.createdAt)}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <p><strong>Email:</strong> {currentItem?.email}</p>
                        <p><strong>Phone:</strong> {currentItem?.phone}</p>
                        <p><strong>Subject:</strong> {currentItem?.subject}</p>

                        <div className="p-4 bg-gray-100 rounded-md max-h-60 overflow-y-auto">
                            <p>{currentItem?.message}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={confirmDelete}
                title="Are you sure?"
                description={`This will permanently delete the message from "${itemToDelete?.name}". This action cannot be undone.`}
            />
        </AdminLayout>
    );
};

export default ContactEnquiriesPage;

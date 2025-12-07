
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet';
import { Building, Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import useCrud from '@/hooks/useCrud';
import CollegeForm from '@/components/admin/CollegeForm';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SearchFilter from '@/components/admin/SearchFilter';
import Pagination from '@/components/admin/Pagination';
import { Skeleton } from '@/components/ui/skeleton';

const CollegeManagementPage = () => {
    const { toast } = useToast();
    const { items: colleges, loading, addItem, updateItem, deleteItem } = useCrud('colleges');

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

    const handleAddNew = () => {
        setCurrentItem(null);
        setDialogOpen(true);
    };

    const handleEdit = (college) => {
        setCurrentItem(college);
        setDialogOpen(true);
    };

    const handleDelete = (college) => {
        setItemToDelete(college);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            const result = await deleteItem(itemToDelete.id);
            if (!result.error) {
                toast({ title: "College Deleted", description: `"${itemToDelete.name}" has been removed.` });
            } else {
                toast({ title: "Error", description: result.error, variant: 'destructive' });
            }
        }
        setConfirmOpen(false);
        setItemToDelete(null);
    };
    
    const handleFormSubmit = async (values) => {
        const result = currentItem ? await updateItem(currentItem.id, values) : await addItem(values);
        if (!result.error) {
            toast({ title: `College ${currentItem ? 'Updated' : 'Added'}`, description: `"${values.name}" has been successfully managed.` });
            setDialogOpen(false);
        } else {
            toast({ title: "Error", description: result.error, variant: 'destructive' });
        }
    };

    const searchKeys = ['name', 'city', 'state', 'code'];
    const filterConfig = [
        { key: 'type', label: 'Types', placeholder: 'Filter by type', options: [{ value: 'government', label: 'Government' }, { value: 'private', label: 'Private' }, { value: 'deemed', label: 'Deemed' }] }
    ];

    return (
        <AdminLayout>
            <Helmet><title>College Management - Admin</title></Helmet>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-poppins flex items-center"><Building className="mr-3" /> College Management</h1>
                <Button onClick={handleAddNew} className="bg-[#a0291f] hover:bg-[#7a1f17]"><Plus className="mr-2 h-4 w-4" /> Add New College</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <SearchFilter items={colleges} searchKeys={searchKeys} filterConfig={filterConfig} onFilter={setFilteredItems} onItemsPerPageChange={setItemsPerPage} />
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>College Name</TableHead>
                                <TableHead>College Code</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                            )) : paginatedItems.map(college => (
                                <TableRow key={college.id}>
                                    <TableCell className="font-medium">{college.name}</TableCell>
                                    <TableCell className="font-mono text-sm">{college.code}</TableCell>
                                    <TableCell>{college.city}, {college.state}</TableCell>
                                    <TableCell><Badge variant="outline" className="capitalize">{college.type}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(college)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(college)} className="text-red-600 focus:text-red-600 focus:bg-red-50"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination totalItems={filteredItems.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{currentItem ? 'Edit College' : 'Add New College'}</DialogTitle>
                        <DialogDescription>{currentItem ? 'Update college details.' : 'Create a new college.'}</DialogDescription>
                    </DialogHeader>
                    <CollegeForm onSubmit={handleFormSubmit} initialData={currentItem} existingColleges={colleges} />
                </DialogContent>
            </Dialog>
            
            <ConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={confirmDelete} title="Are you sure?" description={`This will permanently delete the college "${itemToDelete?.name}". This action cannot be undone.`} />
        </AdminLayout>
    );
};

export default CollegeManagementPage;

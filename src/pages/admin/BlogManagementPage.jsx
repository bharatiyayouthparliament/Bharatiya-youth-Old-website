import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import useCrud from '@/hooks/useCrud';
import { Book, Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import BlogForm from '@/components/admin/BlogForm';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import SearchFilter from '@/components/admin/SearchFilter';
import Pagination from '@/components/admin/Pagination';
import { Skeleton } from '@/components/ui/skeleton';

const BlogManagementPage = () => {
  const { toast } = useToast();
  
  // Connect Firestore CRUD for blogs
  const { items: blogs, loading, addItem, updateItem, deleteItem } = useCrud('blogs');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (blogs) {
      setFilteredItems(blogs);
    }
  }, [blogs]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleAddNew = () => {
    setCurrentItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (blog) => {
    setCurrentItem(blog);
    setDialogOpen(true);
  };

  const handleDelete = (blog) => {
    setItemToDelete(blog);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      const result = await deleteItem(itemToDelete.id);

      if (!result.error) {
        toast({
          title: "Blog Deleted",
          description: `"${itemToDelete.title}" has been removed.`
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: 'destructive'
        });
      }
    }

    setConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleFormSubmit = async (values) => {
    // If editing → update
    // If new → create
    const result = currentItem
      ? await updateItem(currentItem.id, values)
      : await addItem(values);

    if (!result.error) {
      toast({
        title: `Blog ${currentItem ? 'Updated' : 'Added'}`,
        description: `"${values.title}" has been saved successfully.`
      });
      setDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: 'destructive'
      });
    }
  };

  const searchKeys = ['title', 'category'];

  const filterConfig = [
    {
      key: 'status',
      label: 'Statuses',
      placeholder: 'Filter by status',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' }
      ]
    },
    {
      key: 'category',
      label: 'Categories',
      placeholder: 'Filter by category',
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'leadership', label: 'Leadership' },
        { value: 'youth', label: 'Youth' },
        { value: 'events', label: 'Events' },
        { value: 'other', label: 'Other' }
      ]
    }
  ];

  return (
    <AdminLayout>
      <Helmet>
        <title>Blog Management - Admin</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-poppins flex items-center">
          <Book className="mr-3" /> Blog Management
        </h1>

        <Button
          onClick={handleAddNew}
          className="bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <SearchFilter
          items={blogs}
          searchKeys={searchKeys}
          filterConfig={filterConfig}
          onFilter={setFilteredItems}
          onItemsPerPageChange={setItemsPerPage}
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
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
                paginatedItems.map(blog => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="h-10 w-16 object-cover rounded-md"
                      />
                    </TableCell>

                    <TableCell className="font-medium max-w-xs truncate">
                      {blog.title}
                    </TableCell>

                    <TableCell className="capitalize">
                      {blog.category}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={blog.status === 'published' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {blog.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {blog.published_date
                        ? new Date(blog.published_date).toLocaleDateString()
                        : '—'}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(blog)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleDelete(blog)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {currentItem ? 'Edit Blog Post' : 'Add New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              {currentItem ? 'Update post details.' : 'Create a new blog post.'}
            </DialogDescription>
          </DialogHeader>

          <BlogForm
            onSubmit={handleFormSubmit}
            initialData={currentItem}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={confirmDelete}
        title="Are you sure?"
        description={`This will permanently delete the post "${itemToDelete?.title}". This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default BlogManagementPage;

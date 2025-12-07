import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Search, Filter, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/admin/Pagination';
import { Skeleton } from '@/components/ui/skeleton';

const CollegeList = ({ colleges, loading, onEdit, onDelete, onAddNew }) => {

    const [searchTerm, setSearchTerm] = React.useState('');
    const [filters, setFilters] = React.useState({
        government: true,
        private: true,
        deemed: true,
    });
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    // Filtered list
    const filteredColleges = React.useMemo(() => {
        return colleges
            .filter(c => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    c.name.toLowerCase().includes(searchLower) ||
                    c.city.toLowerCase().includes(searchLower) ||
                    c.state.toLowerCase().includes(searchLower) ||
                    c.code.toLowerCase().includes(searchLower)
                );
            })
            .filter(c => filters[c.type]);
    }, [colleges, searchTerm, filters]);

    // Paginated list
    const paginatedColleges = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredColleges.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredColleges, currentPage]);

    const handleFilterChange = (type) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={filters.government}
                                onCheckedChange={() => handleFilterChange('government')}
                            >
                                Government
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filters.private}
                                onCheckedChange={() => handleFilterChange('private')}
                            >
                                Private
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filters.deemed}
                                onCheckedChange={() => handleFilterChange('deemed')}
                            >
                                Deemed
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* ⭐ Add New College Button */}
                    <Button className="bg-[#a0291f] hover:bg-[#7a1f17]" onClick={onAddNew}>
                        <Plus className="mr-2 h-4 w-4" /> Add College
                    </Button>
                </div>

            </div>

            {/* TABLE */}
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
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : paginatedColleges.length > 0 ? (
                            paginatedColleges.map(college => (
                                <TableRow key={college.id}>
                                    <TableCell className="font-medium">{college.name}</TableCell>
                                    <TableCell className="font-mono text-sm">{college.code}</TableCell>
                                    <TableCell>{college.city}, {college.state}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">{college.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEdit(college)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => onDelete(college)}
                                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    No colleges found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>

            {/* PAGINATION */}
            <Pagination
                totalItems={filteredColleges.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />

        </div>
    );
};

export default CollegeList;

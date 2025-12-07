
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchFilter = ({ items, searchKeys, filterConfig, onFilter, itemsPerPageOptions = [10, 25, 50], onItemsPerPageChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState(
        filterConfig.reduce((acc, f) => ({ ...acc, [f.key]: 'all' }), {})
    );
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    React.useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            let filteredItems = items.filter(item => {
                const term = searchTerm.toLowerCase();
                return searchKeys.some(key => String(item[key]).toLowerCase().includes(term));
            });

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== 'all') {
                    filteredItems = filteredItems.filter(item => item[key] === value);
                }
            });
            onFilter(filteredItems);
        }, 300);

        return () => clearTimeout(debouncedSearch);
    }, [searchTerm, filters, items, searchKeys, filterConfig, onFilter]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleItemsPerPageChange = (value) => {
        const numValue = parseInt(value, 10);
        setItemsPerPage(numValue);
        onItemsPerPageChange(numValue);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters(filterConfig.reduce((acc, f) => ({ ...acc, [f.key]: 'all' }), {}));
    };

    const hasActiveFilters = searchTerm || Object.values(filters).some(v => v !== 'all');

    return (
        <div className="flex flex-wrap gap-4 items-center mb-4">
            <div className="relative flex-grow min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            {filterConfig.map(f => (
                <Select key={f.key} value={filters[f.key]} onValueChange={(value) => handleFilterChange(f.key, value)}>
                    <SelectTrigger className="w-full sm:w-auto min-w-[150px]">
                        <SelectValue placeholder={f.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All {f.label}</SelectItem>
                        {f.options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}
            <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-full sm:w-auto">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {itemsPerPageOptions.map(option => (
                        <SelectItem key={option} value={String(option)}>{option} per page</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" /> Clear
                </Button>
            )}
        </div>
    );
};

export default SearchFilter;

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {

    // Prevent division error
    const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;

    const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));

    // Hide pagination when there is only 1 page or no items
    if (totalPages <= 1 || totalItems === 0) return null;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-between mt-4">
            
            {/* Total Count */}
            <div className="text-sm text-muted-foreground">
                Showing {totalItems} items
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">

                {/* First Page */}
                <Button variant="outline" size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Prev */}
                <Button variant="outline" size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                {/* Next */}
                <Button variant="outline" size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last Page */}
                <Button variant="outline" size="icon"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>

            </div>
        </div>
    );
};

export default Pagination;


import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

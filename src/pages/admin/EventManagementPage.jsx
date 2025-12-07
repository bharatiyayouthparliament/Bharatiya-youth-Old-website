
import React from 'react';
import { Helmet } from 'react-helmet';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const EventManagementPage = () => {
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
      title: "🚧 Feature In Progress",
      description: "This feature isn't implemented yet! 🚀",
    });
  };
  
  return (
    <AdminLayout>
      <Helmet>
        <title>Event Management - Admin</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <p className="text-gray-500">
          Manage details, speakers, and galleries for all event editions.
        </p>
        <Card onClick={handleFeatureClick} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Manage Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Click here to edit event details, manage speakers, and upload gallery images for each edition.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EventManagementPage;

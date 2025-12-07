// src/components/admin/AdminForm.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateEmail, validatePhone, validatePassword } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';

const AdminForm = ({ onSubmit, initialData, existingUsers = [] }) => {

  const { user: currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'admin',
  });

  const [errors, setErrors] = useState({});
  const isEditMode = !!initialData;

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        password: "",
        role: initialData.role || "admin",
      });
    }
  }, [initialData, isEditMode]);

  const validate = () => {
    let temp = {};

    if (!formData.name || formData.name.length < 3)
      temp.name = "Minimum 3 characters required.";

    if (!validateEmail(formData.email))
      temp.email = "Invalid email format.";

    if (!validatePhone(formData.phone))
      temp.phone = "Phone must be 10 digits.";

    if (!isEditMode && !validatePassword(formData.password))
      temp.password = "Weak password (A-Z, a-z, number, special, 8 chars).";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label>Name</Label>
        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <Label>Email</Label>
        <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <Label>Phone</Label>
        <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {!isEditMode && (
        <div>
          <Label>Password</Label>
          <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
      )}

      <div>
        <Label>Role</Label>
        <Select value={formData.role} onValueChange={(role) => setFormData({ ...formData, role })}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            {currentUser.role === "super_admin" && (
              <SelectItem value="master_admin">Master Admin</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <Button className="bg-red-700 text-white w-full">
        {isEditMode ? "Update Admin" : "Create Admin"}
      </Button>

    </form>
  );
};

export default AdminForm;

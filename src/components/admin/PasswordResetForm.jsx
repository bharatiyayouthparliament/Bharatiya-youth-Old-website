// src/components/admin/PasswordResetForm.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePassword } from "@/utils/validation";

const PasswordResetForm = ({ onSubmit, onCancel }) => {

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError("Weak password: must include uppercase, lowercase, number & special char.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    await onSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label>New Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div>
        <Label>Confirm Password</Label>
        <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button className="bg-[#a0291f] text-white">Reset Password</Button>
      </div>

    </form>
  );
};

export default PasswordResetForm;
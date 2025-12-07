// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AdminLoginPage = () => {
  const { toast } = useToast();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(credentials.username, credentials.password);

    if (result.success) {
      toast({ title: "Login Successful", description: "Welcome Admin!" });
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive"
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Bharatiya Youth Parliament</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-[#a0291f] mx-auto mb-4" />
            <h1 className="font-poppins font-bold text-3xl">Admin Portal</h1>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Email</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="email"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#a0291f] hover:bg-[#7a1f17]">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLoginPage;
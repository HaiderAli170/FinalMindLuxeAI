'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  User, Edit, Trash, UserPlus, 
  Heart, DollarSign, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import UserForm from '@/components/dashboard/userForm';
import UserDetails from '@/components/dashboard/userDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getUsers, updateUsers } from '@/actions';
import { toast } from 'sonner';
import EditUserForm from '@/components/dashboard/editUserForm';
import AddUserForm from '@/components/dashboard/addUserForm';
import { deleteUser } from '@/actions/user-actions';

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  isPremium: boolean;
  mentalHealthScore: number;
  age: any ;
  gender: string | null;
  bloodGroup: string | null;
  medicalIssues: string | null;
  height: number | null;
  weight: number | null;
}

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { data: users = [], isLoading, isError, error: queryError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users...');
      const data = await getUsers();
      console.log('Users data received:', data);
      return data;
    },
    retry: 1,
  });
console.log(users,"Users")
  useEffect(() => {
    if (queryError) {
      console.error('Query error:', queryError);
      setError(queryError instanceof Error ? queryError.message : 'An unknown error occurred');
    }
  }, [queryError]);

  // const handleAddUser = async (userData: any) => {
  //   try {
  //     await createUser({
  //       name: userData.name,
  //       email: userData.email,
  //       mentalHealthScore: 0,
  //       isPremium: userData.isPremium || false,
  //       notes: ''
  //     });
  //     toast.success('User added successfully');
  //     setIsAddingUser(false);
  //     refetch();
  //   } catch (error) {
  //     toast.error('Failed to add user');
  //     console.error(error);
  //   }
  // };

  const handleEditUser = async (userData: any) => {
    if (!selectedUser) return;
    
    try {
      await updateUsers(selectedUser.id, {
        name: userData.name,
        age: userData.age,
        height: userData.height,
        weight: userData.weight,
        isPremium: userData.isPremium
      });
      toast.success('User updated successfully');
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to update user');
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  const viewUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const getMentalHealthStatus = (score: number) => {
    if (score >= 85) return { status: 'Excellent', color: 'text-green-500' };
    if (score >= 70) return { status: 'Good', color: 'text-blue-500' };
    if (score >= 50) return { status: 'Fair', color: 'text-yellow-500' };
    return { status: 'Needs Attention', color: 'text-red-500' };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-xl">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error Loading Users</AlertTitle>
          <AlertDescription>
            <p className="mb-2">Failed to load user data. Please try again later.</p>
            {error && (
              <p className="text-sm text-red-500 mt-2">
                Error details: {error}
              </p>
            )}
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-medium">User Management</h1>
            <p className="mt-1 text-sm">
              Manage users, track mental health scores, and premium subscriptions
            </p>
          </div>
        </header>

        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age || 'N/A'}</TableCell>
                    <TableCell>
                      {user.isPremium ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span>Premium</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Free</span>
                      )}
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewUserDetails(user)}
                        >
                          <User className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              Showing {users.length} users
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>User Details</SheetTitle>
            </SheetHeader>
            {selectedUser && <UserDetails user={selectedUser} />}
            <SheetFooter className="mt-4">
              <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Edit User Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <EditUserForm
                user={selectedUser}
                onSubmit={handleEditUser}
                onCancel={() => setIsEditModalOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Users;

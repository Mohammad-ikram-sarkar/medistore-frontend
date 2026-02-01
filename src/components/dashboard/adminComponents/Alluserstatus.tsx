"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Users, 
  Mail, 
  Calendar, 
  Shield, 
  CheckCircle, 
  XCircle,
  Loader2,
  UserCheck,
  UserX,
  Crown,
  ShoppingBag,
  Store
} from 'lucide-react';
import RoleStatusChangeAction from '@/action/RoleStatusChange.action';

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AllUsersStatusProps {
  data: User[];
}

const roleOptions = [
  { 
    value: "customer", 
    label: "Customer", 
    color: "bg-blue-100 text-blue-800",
    icon: ShoppingBag,
    description: "Can browse and purchase products"
  },
  { 
    value: "seller", 
    label: "Seller", 
    color: "bg-purple-100 text-purple-800",
    icon: Store,
    description: "Can manage products and orders"
  },
  { 
    value: "admin", 
    label: "Admin", 
    color: "bg-orange-100 text-orange-800",
    icon: Crown,
    description: "Full system administration access"
  }
];

const Alluserstatus: React.FC<AllUsersStatusProps> = ({ data }) => {
  const [users, setUsers] = useState<User[]>(data);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getRoleInfo = (role: string) => {
    return roleOptions.find(option => option.value === role.toLowerCase()) || roleOptions[0];
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoadingId(userId);
    
    try {
      const result = await RoleStatusChangeAction(userId, newRole);

      if (!result.success || result.error) {
        toast.error("Failed to update user role", {
          description: result.error || "Unknown error occurred"
        });
      } else {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        
        const roleInfo = getRoleInfo(newRole);
        toast.success("User role updated successfully", {
          description: `User role changed to ${roleInfo.label}`
        });
      }
    } catch (error) {
      toast.error("Failed to update user role", {
        description: "Network error occurred"
      });
    }

    setLoadingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Users Found</h3>
            <p className="text-gray-500">There are no users to manage at the moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Role Management</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {users.length} {users.length === 1 ? 'User' : 'Users'}
        </Badge>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {roleOptions.map((roleOption) => {
          const count = users.filter(user => user.role.toLowerCase() === roleOption.value).length;
          const IconComponent = roleOption.icon;
          
          return (
            <Card key={roleOption.value} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${roleOption.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{count}</p>
                  <p className="text-sm text-gray-600">{roleOption.label}s</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6">
        {users.map((user) => {
          const roleInfo = getRoleInfo(user.role);
          const IconComponent = roleInfo.icon;
          
          return (
            <Card key={user.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.image || undefined} alt={user.name} />
                      <AvatarFallback className="bg-blue-500 text-white font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        {user.name}
                        {user.emailVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`px-3 py-1 font-medium ${roleInfo.color}`}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {roleInfo.label.toUpperCase()}
                    </Badge>
                    
                    <Badge className={`px-3 py-1 font-medium ${user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.emailVerified ? (
                        <UserCheck className="w-3 h-3 mr-1" />
                      ) : (
                        <UserX className="w-3 h-3 mr-1" />
                      )}
                      {user.emailVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* User Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      User Details
                    </h3>
                    
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">User ID:</span>
                        <span className="text-sm font-mono text-gray-900">{user.id.slice(-8)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Current Role:</span>
                        <Badge className={`text-xs ${roleInfo.color}`}>
                          <IconComponent className="w-3 h-3 mr-1" />
                          {roleInfo.label}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Email Status:</span>
                        <Badge variant={user.emailVerified ? "default" : "destructive"} className="text-xs">
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Account Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Account Timeline
                    </h3>
                    
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-blue-900">Account Created</p>
                          <p className="text-xs text-blue-700">{formatDate(user.createdAt)}</p>
                        </div>
                      </div>
                      
                      {user.updatedAt !== user.createdAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-green-900">Last Updated</p>
                            <p className="text-xs text-green-700">{formatDate(user.updatedAt)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role Management */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Change Role
                    </h3>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          <p className="font-medium mb-1">Current: {roleInfo.label}</p>
                          <p className="text-xs">{roleInfo.description}</p>
                        </div>
                        
                        <Select
                          value={user.role.toLowerCase()}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                          disabled={loadingId === user.id}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((role) => {
                              const RoleIcon = role.icon;
                              return (
                                <SelectItem key={role.value} value={role.value}>
                                  <div className="flex items-center gap-2">
                                    <RoleIcon className="w-4 h-4" />
                                    <div>
                                      <p className="font-medium">{role.label}</p>
                                      <p className="text-xs text-gray-500">{role.description}</p>
                                    </div>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        
                        {loadingId === user.id && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Updating role...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                    <div className="text-sm text-gray-600">
                      User ID: <span className="font-mono font-medium">{user.id}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {user.role.toLowerCase() === 'admin' && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          <Crown className="w-3 h-3 mr-1" />
                          Administrator
                        </Badge>
                      )}
                      {user.role.toLowerCase() === 'seller' && (
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          <Store className="w-3 h-3 mr-1" />
                          Seller Account
                        </Badge>
                      )}
                      {user.role.toLowerCase() === 'customer' && (
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          Customer Account
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Alluserstatus;
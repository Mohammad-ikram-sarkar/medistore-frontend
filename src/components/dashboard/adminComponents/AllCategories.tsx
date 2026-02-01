"use client";

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Tag,
  Package,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from '@/action/category.actions';

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  medicines?: any[]; // Optional medicines array
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AllCategoriesProps {
  data: Category[];
  pagination?: Pagination;
}

const AllCategories: React.FC<AllCategoriesProps> = ({ data: initialData, pagination }) => {
  const [categories, setCategories] = useState<Category[]>(initialData?.filter(cat => cat && cat.name) || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  
  const [isPending, startTransition] = useTransition();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredCategories = categories.filter(category => category && category.id && category.name)


  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    startTransition(async () => {
      try {
        const result = await createCategoryAction(newCategoryName.trim());
        
        if (result.success && result.data && result.data.name) {
          // Add the new category to the local state
          setCategories(prev => [result.data, ...prev]);
          setNewCategoryName('');
          setIsCreateDialogOpen(false);
          toast.success('Category created successfully');
        } else {
          toast.error(result.error || 'Failed to create category');
        }
      } catch (error) {
        toast.error('Failed to create category');
      }
    });
  };

  const handleEditCategory = async () => {
    if (!editCategoryName.trim() || !editingCategory) {
      toast.error('Category name is required');
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateCategoryAction(editingCategory.id, editCategoryName.trim());
        
        if (result.success) {
          // Update the category in local state
          setCategories(prev => 
            prev.map(cat => cat.id === editingCategory.id ? result.data : cat)
          );
          setIsEditDialogOpen(false);
          setEditingCategory(null);
          setEditCategoryName('');
          toast.success('Category updated successfully');
        } else {
          toast.error(result.error || 'Failed to update category');
        }
      } catch (error) {
        toast.error('Failed to update category');
      }
    });
  };

  const handleDeleteCategory = async (categoryId: string) => {
    setDeleteLoading(categoryId);
    
    startTransition(async () => {
      try {
        const result = await deleteCategoryAction(categoryId);
        
        if (result.success) {
          // Remove the category from local state
          setCategories(prev => prev.filter(cat => cat.id !== categoryId));
          toast.success('Category deleted successfully');
        } else {
          toast.error(result.error || 'Failed to delete category');
        }
      } catch (error) {
        toast.error('Failed to delete category');
      } finally {
        setDeleteLoading(null);
      }
    });
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600">Manage product categories and their organization</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Categories</p>
          <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Create Category Button */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateCategory} disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No categories found' : 'No categories yet'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Create your first category to get started'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredCategories
            .filter(category => category && category.id && category.name) // Filter out invalid categories
            .map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="w-5 h-5 text-blue-600" />
                      {category.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Created {formatDate(category.createdAt)}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    <Package className="w-3 h-3 mr-1" />
                    {category.medicines?.length || 0} items
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Category ID:</span>
                      <span className="font-mono text-xs">{category.id.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="text-xs">{formatDate(category.updatedAt)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(category)}
                      className="flex-1"
                      disabled={isPending}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={deleteLoading === category.id || isPending}
                        >
                          {deleteLoading === category.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{category.name}"? This action cannot be undone.
                            {category.medicines && category.medicines.length > 0 && (
                              <span className="block mt-2 text-red-600 font-medium">
                                Warning: This category has {category.medicines.length} associated medicines.
                              </span>
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCategory(category.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Category
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Info */}
      {pagination && (
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} categories
          </div>
          <div className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editCategoryName">Category Name</Label>
              <Input
                id="editCategoryName"
                placeholder="Enter category name"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingCategory(null);
                setEditCategoryName('');
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory} disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllCategories;
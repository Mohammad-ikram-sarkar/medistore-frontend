"use client";

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
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
  Search, 
  Edit, 
  Trash2, 
  Package,
  DollarSign,
  Building2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { updateMedicineAction, deleteMedicineAction } from '@/action/medicine.actions';

interface Medicine {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  image: string;
  description: string;
  expiryDate: string;
  price: number;
  categoryId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface MyMedicinesProps {
  medicines: Medicine[];
}

const MyMedicines: React.FC<MyMedicinesProps> = ({ medicines: initialMedicines }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  
  // Form states for editing
  const [editName, setEditName] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editQuantity, setEditQuantity] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  
  const [isPending, startTransition] = useTransition();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `৳${price.toFixed(2)}`;
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsUntilExpiry = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsUntilExpiry < 6;
  };

  const filteredMedicines = medicines.filter(medicine => 
    medicine && 
    medicine.name &&
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditDialog = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setEditName(medicine.name);
    setEditBrand(medicine.brand);
    setEditQuantity(medicine.quantity);
    setEditPrice(medicine.price);
    setEditDescription(medicine.description);
    setEditImage(medicine.image);
    setEditExpiryDate(medicine.expiryDate.split('T')[0]); // Format for date input
    setIsEditDialogOpen(true);
  };

  const handleUpdateMedicine = async () => {
    if (!editingMedicine || !editName.trim() || !editBrand.trim()) {
      toast.error('Name and brand are required');
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateMedicineAction(editingMedicine.id, {
          name: editName.trim(),
          brand: editBrand.trim(),
          quantity: editQuantity,
          price: editPrice,
          description: editDescription.trim(),
          image: editImage.trim(),
          expiryDate: editExpiryDate,
        });
        
        if (result.success && result.data) {
          // Update the medicine in local state
          setMedicines(prev => 
            prev.map(med => med.id === editingMedicine.id ? { ...med, ...result.data } : med)
          );
          setIsEditDialogOpen(false);
          setEditingMedicine(null);
          toast.success('Medicine updated successfully');
        } else {
          toast.error(result.error || 'Failed to update medicine');
        }
      } catch (error) {
        toast.error('Failed to update medicine');
      }
    });
  };

  const handleDeleteMedicine = async (medicineId: string) => {
    setDeleteLoading(medicineId);
    
    startTransition(async () => {
      try {
        const result = await deleteMedicineAction(medicineId);
        
        if (result.success) {
          // Remove the medicine from local state
          setMedicines(prev => prev.filter(med => med.id !== medicineId));
          toast.success('Medicine deleted successfully');
        } else {
          toast.error(result.error || 'Failed to delete medicine');
        }
      } catch (error) {
        toast.error('Failed to delete medicine');
      } finally {
        setDeleteLoading(null);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Medicines</h1>
          <p className="text-gray-600">Manage your medicine inventory</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Medicines</p>
          <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No medicines found' : 'No medicines yet'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Add your first medicine to get started'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      {medicine.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4" />
                      {medicine.brand}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={medicine.quantity < 20 ? 'destructive' : 'default'}>
                      {medicine.quantity} units
                    </Badge>
                    {isExpiringSoon(medicine.expiryDate) && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Expiring Soon
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Medicine Image */}
                  {medicine.image && (
                    <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(medicine.price)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {medicine.description}
                  </p>

                  {/* Details */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Expiry Date:</span>
                      <span className={isExpiringSoon(medicine.expiryDate) ? 'text-red-600 font-medium' : ''}>
                        {formatDate(medicine.expiryDate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{formatDate(medicine.createdAt)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(medicine)}
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
                          disabled={deleteLoading === medicine.id || isPending}
                        >
                          {deleteLoading === medicine.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Medicine</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{medicine.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteMedicine(medicine.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Medicine
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editName">Medicine Name</Label>
                <Input
                  id="editName"
                  placeholder="Enter medicine name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="editBrand">Brand</Label>
                <Input
                  id="editBrand"
                  placeholder="Enter brand name"
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editQuantity">Quantity</Label>
                <Input
                  id="editQuantity"
                  type="number"
                  min="0"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="editPrice">Price (৳)</Label>
                <Input
                  id="editPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="editExpiryDate">Expiry Date</Label>
              <Input
                id="editExpiryDate"
                type="date"
                value={editExpiryDate}
                onChange={(e) => setEditExpiryDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="editImage">Image URL</Label>
              <Input
                id="editImage"
                placeholder="Enter image URL"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                placeholder="Enter medicine description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingMedicine(null);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateMedicine} disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyMedicines;
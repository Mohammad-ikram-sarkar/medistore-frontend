'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { createMedicine } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type MedicineCreateProps = {
  categories: Category[];
  authorId: string;
};

// Zod schema for validation
const medicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required').max(100),
  brand: z.string().min(1, 'Brand name is required').max(100),
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().int().min(0, 'Quantity must be 0 or greater'),
  image: z.string().url('Must be a valid URL'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  description: z.string().min(1, 'Description is required').max(500),
  categoryId: z.string().min(1, 'Category is required'),
});

type MedicineFormData = z.infer<typeof medicineSchema>;

const MedicineCreate: React.FC<MedicineCreateProps> = ({
  categories,
  authorId,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      brand: '',
      price: 0,
      quantity: 0,
      image: '',
      expiryDate: '',
      description: '',
      categoryId: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('brand', value.brand);
        formData.append('price', value.price.toString());
        formData.append('quantity', value.quantity.toString());
        formData.append('image', value.image);
        formData.append('expiryDate', value.expiryDate);
        formData.append('description', value.description);
        formData.append('categoryId', value.categoryId);
        formData.append('authorId', authorId);

        // const result = await createMedicine(formData);
        console.log(formData)

        // if (result.success) {
        //   toast.success('Medicine created successfully!');
        //   router.push('/medicines');
        // } else {
        //   toast.error(result.error || 'Failed to create medicine');
        // }
      } catch (error) {
        toast.error('An error occurred while creating the medicine');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    
  });

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Medicine</CardTitle>
          <CardDescription>
            Add a new medicine to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Medicine Name */}
            <form.Field
              name="name"
              validators={{
                onChange: medicineSchema.shape.name,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Medicine Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Napa"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Brand */}
            <form.Field
              name="brand"
              validators={{
                onChange: medicineSchema.shape.brand,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="brand">
                    Brand <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Beximco Pharmaceuticals Ltd"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Price and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="price"
                validators={{
                  onChange: medicineSchema.shape.price,
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price (৳) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseFloat(e.target.value) || 0)
                      }
                      placeholder="25"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              />

              <form.Field
                name="quantity"
                validators={{
                  onChange: medicineSchema.shape.quantity,
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseInt(e.target.value) || 0)
                      }
                      placeholder="100"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Image URL */}
            <form.Field
              name="image"
              validators={{
                onChange: medicineSchema.shape.image,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="image">
                    Image URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                  {field.state.value && (
                    <div className="mt-2">
                      <img
                        src={field.state.value}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            />

            {/* Expiry Date */}
            <form.Field
              name="expiryDate"
              validators={{
                onChange: medicineSchema.shape.expiryDate,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Category */}
            <form.Field
              name="categoryId"
              validators={{
                onChange: medicineSchema.shape.categoryId,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="categoryId">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Description */}
            <form.Field
              name="description"
              validators={{
                onChange: medicineSchema.shape.description,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Used to reduce fever and relieve pain"
                    rows={4}
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Creating...' : 'Create Medicine'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineCreate;
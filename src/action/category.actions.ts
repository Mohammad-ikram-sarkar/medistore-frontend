"use server";

import adminService from '@/service/admin.service';
import { revalidatePath } from 'next/cache';

export async function createCategoryAction(name: string) {
  try {
    const result = await adminService.createCategory({ name });
    
    if (result.error) {
      return { success: false, error: result.error };
    }

    // Revalidate the categories page to show the new category
    revalidatePath('/admin-dashboard/categories');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Create category action error:', error);
    return { success: false, error: 'Failed to create category' };
  }
}

export async function updateCategoryAction(id: string, name: string) {
  try {
    const result = await adminService.updateCategory(id, { name });
    
    if (result.error) {
      return { success: false, error: result.error };
    }

    // Revalidate the categories page to show the updated category
    revalidatePath('/admin-dashboard/categories');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Update category action error:', error);
    return { success: false, error: 'Failed to update category' };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    const result = await adminService.deleteCategory(id);
    
    if (result.error) {
      return { success: false, error: result.error };
    }

    // Revalidate the categories page to remove the deleted category
    revalidatePath('/admin-dashboard/categories');
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Delete category action error:', error);
    return { success: false, error: 'Failed to delete category' };
  }
}
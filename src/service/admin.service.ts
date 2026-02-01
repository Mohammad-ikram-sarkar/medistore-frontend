import { cookies } from "next/headers";
import { env } from "../../env";

const adminService = {
    getalluser : async () => {
         try {
               const cookieStore = await cookies();
              const response = await fetch(`${env.API_URL}/api/admin/users`,
                {
                   headers: {
                  "Content-Type": "application/json",
                  Cookie: cookieStore.toString(),
                },
                }
              );
              const data = await response.json();
        
              return { data: data, error: null };
            } catch (error) {
              return { data: null, error: "get api not working" }
            }
        
    },
    getAllOrders : async () => {
         try {
               const cookieStore = await cookies();
              const response = await fetch(`${env.API_URL}/api/admin/users/orders`,
                {
                   headers: {
                  "Content-Type": "application/json",
                  Cookie: cookieStore.toString(),
                },
                }
              );
              const data = await response.json();
        
              return { data: data, error: null };
            } catch (error) {
              return { data: null, error: "get api not working" }
            }
        
    },

    // Categories API functions
    createCategory : async (categoryData: { name: string }) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/admin/users/categories`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(categoryData)
            });
            const data = await response.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: "create category api not working" }
        }
    },

    getAllCategories : async (searchParams?: { search?: string; page?: number; limit?: number }) => {
        try {
            const cookieStore = await cookies();
            const params = new URLSearchParams();
            if (searchParams?.search) params.append('search', searchParams.search);
            if (searchParams?.page) params.append('page', searchParams.page.toString());
            if (searchParams?.limit) params.append('limit', searchParams.limit.toString());
            
            const response = await fetch(`${env.API_URL}/api/admin/users/categories?${params.toString()}`, {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await response.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: "get categories api not working" }
        }
    },

    updateCategory : async (id: string, categoryData: { name?: string }) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/admin/users/categories/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(categoryData)
            });
            const data = await response.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: "update category api not working" }
        }
    },

    deleteCategory : async (id: string) => {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${env.API_URL}/api/admin/users/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await response.json();
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: "delete category api not working" }
        }
    }
}
export default adminService
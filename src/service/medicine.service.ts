import { cookies } from "next/headers";
import { env } from "../../env";


const medicineService = {


  getMedicines: async (searchParams?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }) => {
    try {
      // Build query string from search parameters
      const queryParams = new URLSearchParams();
      
      if (searchParams?.search) queryParams.append('search', searchParams.search);
      if (searchParams?.category) queryParams.append('category', searchParams.category);
      if (searchParams?.minPrice !== undefined) queryParams.append('minPrice', searchParams.minPrice.toString());
      if (searchParams?.maxPrice !== undefined) queryParams.append('maxPrice', searchParams.maxPrice.toString());
      if (searchParams?.page) queryParams.append('page', searchParams.page.toString());
      if (searchParams?.limit) queryParams.append('limit', searchParams.limit.toString());
      if (searchParams?.sortBy) queryParams.append('sortBy', searchParams.sortBy);
      if (searchParams?.sortOrder) queryParams.append('sortOrder', searchParams.sortOrder);

      const queryString = queryParams.toString();
      const url = `${env.BACKEND_URL}/api/medicines${queryString ? `?${queryString}` : ''}`;
      
      console.log('Fetching medicines from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('Medicine fetch failed:', response.status, response.statusText);
        return { data: null, error: `HTTP error! status: ${response.status}` };
      }
      
      const data = await response.json();
      console.log('Medicine response:', data);

      return { data: data.data, error: null };
    } catch (error) {
      console.error('Medicine service error:', error);
      return { data: null, error: "get api not working" }
    }
  },
  getMedcinebyId: async (id: string) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/medicines/${id}`)
      const data = await response.json();

      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: "get api not working" }
    }
  },
  orderMedcinebyId : async () => {
     try {
       const cookieStore = await cookies();
      const response = await fetch(`${env.BACKEND_URL}/api/seller/orders`,
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
  updataStatus: async (id: string, status: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.BACKEND_URL}/api/seller/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data: data.data, error: null };
  } catch (err) {
    return { data: null, error: "API not working or request failed" };
  }
},
getMedicinebySeller : async () => {
   try {
      const cookieStore = await cookies();
      const response = await fetch(`${env.BACKEND_URL}/api/seller/medicines`, {
                   headers: {
                  "Content-Type": "application/json",
                  Cookie: cookieStore.toString(),
                },
                });
      
      if (!response.ok) {
        return { data: null, error: `HTTP error! status: ${response.status}` };
      }
      
      const data = await response.json();
      
      // Handle different response structures
      if (data.success) {
        return { data: data.data, error: null };
      } else {
        return { data: data.data || data, error: null };
      }
    } catch (error) {
      console.error('getMedicinebySeller error:', error);
      return { data: null, error: "get api not working" }
    }
},

// Add medicine creation function
createMedicine: async (medicineData: any) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.BACKEND_URL}/api/seller/medicines`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicineData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { data: data.data, error: null };
    } else {
      return { data: null, error: data.message || "Failed to create medicine" };
    }
  } catch (error) {
    return { data: null, error: "create medicine api not working" };
  }
},

// Update medicine function
updateMedicine: async (id: string, medicineData: any) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.BACKEND_URL}/api/seller/medicines/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicineData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { data: data.data, error: null };
    } else {
      return { data: null, error: data.message || "Failed to update medicine" };
    }
  } catch (error) {
    return { data: null, error: "update medicine api not working" };
  }
},

// Delete medicine function
deleteMedicine: async (id: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.BACKEND_URL}/api/seller/medicines/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { data: data.data, error: null };
    } else {
      return { data: null, error: data.message || "Failed to delete medicine" };
    }
  } catch (error) {
    return { data: null, error: "delete medicine api not working" };
  }
}

}




export default medicineService;
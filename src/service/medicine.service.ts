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
      
      let response;
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add CORS handling for production backend
          mode: 'cors',
          credentials: 'include',
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
      } catch (fetchError) {
        console.error('Network error when fetching medicines:', fetchError);
        
        if (fetchError instanceof Error) {
          if (fetchError.name === 'AbortError') {
            return { data: null, error: 'Request timeout - Production backend may be slow or down' };
          }
          if (fetchError.message.includes('ECONNREFUSED')) {
            return { data: null, error: 'Connection refused - Production backend is not accessible' };
          }
          if (fetchError.message.includes('fetch')) {
            return { data: null, error: `CORS or Network error: ${fetchError.message}. You may need to deploy frontend to production or configure CORS.` };
          }
        }
        
        return { data: null, error: 'Network error - Unable to connect to production backend. Consider deploying to production.' };
      }
      
      if (!response.ok) {
        console.error('Medicine fetch failed:', response.status, response.statusText);
        return { data: null, error: `HTTP error! status: ${response.status}` };
      }
      
      const apiResponse = await response.json();
      console.log('Medicine API response structure:', JSON.stringify(apiResponse, null, 2));

      // Handle different API response structures
      let medicines = [];
      let pagination = {
        page: searchParams?.page || 1,
        limit: searchParams?.limit || 12,
        total: 0,
        totalPages: 0
      };

      if (apiResponse.success && Array.isArray(apiResponse.data)) {
        // Structure: { success: true, data: [...medicines] }
        medicines = apiResponse.data;
        pagination.total = medicines.length;
        pagination.totalPages = Math.ceil(medicines.length / pagination.limit);
      } else if (apiResponse.data && Array.isArray(apiResponse.data.medicines)) {
        // Structure: { data: { medicines: [...], pagination: {...} } }
        medicines = apiResponse.data.medicines;
        pagination = apiResponse.data.pagination || pagination;
      } else if (Array.isArray(apiResponse.data)) {
        // Structure: { data: [...medicines] }
        medicines = apiResponse.data;
        pagination.total = medicines.length;
        pagination.totalPages = Math.ceil(medicines.length / pagination.limit);
      } else if (Array.isArray(apiResponse)) {
        // Structure: [...medicines] (direct array)
        medicines = apiResponse;
        pagination.total = medicines.length;
        pagination.totalPages = Math.ceil(medicines.length / pagination.limit);
      } else {
        console.warn('Unexpected API response structure:', apiResponse);
        medicines = [];
      }

      const transformedData = {
        medicines,
        pagination
      };
      
      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Medicine service error:', error);
      return { data: null, error: "get api not working" }
    }
  },
  getMedcinebyId: async (id: string) => {
    try {
      let response;
      try {
        response = await fetch(`${env.BACKEND_URL}/api/medicines/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'include',
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
      } catch (fetchError) {
        console.error('Network error when fetching medicine by ID:', fetchError);
        
        if (fetchError instanceof Error) {
          if (fetchError.name === 'AbortError') {
            return { data: null, error: 'Request timeout - Production backend may be slow or down' };
          }
          if (fetchError.message.includes('ECONNREFUSED')) {
            return { data: null, error: 'Connection refused - Production backend is not accessible' };
          }
        }
        
        return { data: null, error: 'Network error - Unable to connect to production backend. Consider deploying to production.' };
      }

      if (!response.ok) {
        console.error('Medicine by ID fetch failed:', response.status, response.statusText);
        return { data: null, error: `HTTP error! status: ${response.status}` };
      }

      const data = await response.json();
      return { data: data.data, error: null };
    } catch (err) {
      console.error('getMedcinebyId error:', err);
      return { data: null, error: "Failed to fetch medicine details" }
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
      console.log('Fetching medicines for seller...');
      const cookieStore = await cookies();
      
      let response;
      try {
        response = await fetch(`${env.BACKEND_URL}/api/seller/medicines`, {
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          mode: 'cors',
          credentials: 'include',
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
      } catch (fetchError) {
        console.error('Network error when fetching seller medicines:', fetchError);
        
        if (fetchError instanceof Error) {
          if (fetchError.name === 'AbortError') {
            return { data: null, error: 'Request timeout - Production backend may be slow or down' };
          }
          if (fetchError.message.includes('ECONNREFUSED')) {
            return { data: null, error: 'Connection refused - Production backend is not accessible' };
          }
        }
        
        return { data: null, error: 'Network error - Unable to connect to production backend. Consider deploying to production.' };
      }
      
      console.log('Seller medicines response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Seller medicines API error:', response.status, errorText);
        return { data: null, error: `HTTP error! status: ${response.status} - ${errorText}` };
      }
      
      const data = await response.json();
      console.log('Seller medicines API response:', data);
      
      // Handle different response structures
      if (data.success) {
        return { data: data.data, error: null };
      } else if (data.data) {
        return { data: data.data, error: null };
      } else {
        return { data: data, error: null };
      }
    } catch (error) {
      console.error('getMedicinebySeller error:', error);
      return { data: null, error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` }
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
import Shop from '@/components/module/shop';
import medicineService from '@/service/medicine.service';

import { medicine } from '../../../../types/medicine.type';

interface SearchParams {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
    sortBy?: 'name' | 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

const page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    // Await the searchParams Promise
    const params = await searchParams;
    
    // Convert string parameters to appropriate types
    const searchOptions = {
        search: params.search,
        category: params.category,
        minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
        page: params.page ? parseInt(params.page) : 1,
        limit: params.limit ? parseInt(params.limit) : 12,
        sortBy: params.sortBy || 'createdAt' as const,
        sortOrder: params.sortOrder || 'desc' as const,
    };

    const getmedicine = await medicineService.getMedicines(searchOptions);
    console.log(getmedicine);

    // Handle the new data structure: data.medicines instead of data
    const medicines = getmedicine.data?.medicines || [];
    const pagination = getmedicine.data?.pagination;
    
    return (
        <div className="container mx-auto px-4 sm:py-8 md:py-10">
            {/* Search Bar */}
            <div className="mb-6 mt-10">
                <form method="GET" className="flex gap-4 items-end">
                    <div className="flex-1">
                       
                        <input
                            type="text"
                            id="search"
                            name="search"
                            defaultValue={params.search || ''}
                            placeholder="Search by name, brand, or description..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                       
                        <input
                            type="text"
                            id="category"
                            name="category"
                            defaultValue={params.category || ''}
                            placeholder="Category"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            defaultValue={params.minPrice || ''}
                            placeholder="Min"
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                       
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            defaultValue={params.maxPrice || ''}
                            placeholder="Max"
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        
                        <select
                            id="sortBy"
                            name="sortBy"
                            defaultValue={params.sortBy || 'createdAt'}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="createdAt">Date</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    <div>
                      
                        <select
                            id="sortOrder"
                            name="sortOrder"
                            defaultValue={params.sortOrder || 'desc'}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                   
                </form>
            </div>
            
            {/* Results Section */}
            <div className="mt-6">
                {medicines.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <>
                        {/* Results Info */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-gray-600">
                                Showing {medicines.length} of {pagination?.total || 0} medicines
                                {params.search && (
                                    <span> for "{params.search}"</span>
                                )}
                            </p>
                            <p className="text-sm text-gray-600">
                                Page {pagination?.page || 1} of {pagination?.totalPages || 1}
                            </p>
                        </div>
                        
                        {/* Medicine Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                            {medicines.map((medicine: medicine) => (
                                <Shop medicine={medicine} key={medicine.id}/>
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex gap-2">
                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <a
                                            key={pageNum}
                                            href={`/shop?${new URLSearchParams({
                                                ...params,
                                                page: pageNum.toString()
                                            }).toString()}`}
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                pageNum === (pagination.page || 1)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {pageNum}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default page;
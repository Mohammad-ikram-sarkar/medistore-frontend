import Shop from '@/components/module/shop';
import medicineService from '@/service/medicine.service';
import { SearchFilters } from '@/components/module/SearchFilters';
import { MobileFilterSheet } from '@/components/module/MobileFilterSheet';
import { medicine } from '../../../../types/medicine.type';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Shop Medicines",
  description: "Browse our extensive collection of authentic medicines and healthcare products. Find prescription drugs, over-the-counter medications, and medical supplies with fast delivery.",
  keywords: [
    "buy medicines online",
    "prescription drugs",
    "pharmacy shop",
    "medical supplies",
    "healthcare products",
    "medicine delivery"
  ],
  openGraph: {
    title: "Shop Medicines | MediStore",
    description: "Browse our extensive collection of authentic medicines and healthcare products with fast delivery.",
    images: ["/og-shop.png"],
  },
};

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
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 ">
                {/* Header */}

                {/* Desktop Search Filters */}
                <div className="hidden sm:block mt-10">
                    <SearchFilters currentParams={params} />
                </div>

                {/* Results Section */}
                <div className="mt-8">
                    {medicines.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
                                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all medicines</p>
                                <a
                                    href="/shop"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    View All Medicines
                                </a>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Results Header */}
                        {/* <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-gray-900">{medicines.length}</span> of{' '}
                                            <span className="font-medium text-gray-900">{pagination?.total || 0}</span> medicines
                                            {params.search && (
                                                <span className="ml-1">
                                                    for <span className="font-medium text-blue-600">"{params.search}"</span>
                                                </span>
                                            )}
                                        </p>
                                        {(params.search || params.category || params.minPrice || params.maxPrice) && (
                                            <a
                                                href="/shop"
                                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Clear filters
                                            </a>
                                        )}
                                    </div>
                                     <div className="flex items-center gap-4">
                                        
                                        <div className="sm:hidden">
                                            <MobileFilterSheet currentParams={params} />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Page {pagination?.page || 1} of {pagination?.totalPages || 1}
                                        </p>
                                    </div> 
                                </div>
                            </div> */}

                            {/* Medicine Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                                {medicines.map((medicine: medicine) => (
                                    <Shop medicine={medicine} key={medicine.id} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center gap-1">
                                        {/* Previous Button */}
                                        {pagination.page > 1 && (
                                            <a
                                                href={`/shop?${new URLSearchParams({
                                                    ...params,
                                                    page: (pagination.page - 1).toString()
                                                }).toString()}`}
                                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                                <span className="hidden sm:inline">Previous</span>
                                            </a>
                                        )}

                                        {/* Page Numbers */}
                                        {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
                                            let pageNum;
                                            if (pagination.totalPages <= 7) {
                                                pageNum = i + 1;
                                            } else {
                                                const current = pagination.page;
                                                const total = pagination.totalPages;
                                                if (current <= 4) {
                                                    pageNum = i + 1;
                                                } else if (current >= total - 3) {
                                                    pageNum = total - 6 + i;
                                                } else {
                                                    pageNum = current - 3 + i;
                                                }
                                            }

                                            return (
                                                <a
                                                    key={pageNum}
                                                    href={`/shop?${new URLSearchParams({
                                                        ...params,
                                                        page: pageNum.toString()
                                                    }).toString()}`}
                                                    className={`px-3 py-2 text-sm font-medium border ${pageNum === (pagination.page || 1)
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </a>
                                            );
                                        })}

                                        {/* Next Button */}
                                        {pagination.page < pagination.totalPages && (
                                            <a
                                                href={`/shop?${new URLSearchParams({
                                                    ...params,
                                                    page: (pagination.page + 1).toString()
                                                }).toString()}`}
                                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700"
                                            >
                                                <span className="hidden sm:inline">Next</span>
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        )}
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
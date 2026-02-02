'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { 
  Filter, 
  Search, 
  X, 
  DollarSign,
  Tag,
  SortAsc,
  SortDesc
} from 'lucide-react'

interface SearchParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

interface MobileFilterSheetProps {
  currentParams: SearchParams;
}

export function MobileFilterSheet({ currentParams }: MobileFilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(currentParams.search || '')
  const [categoryValue, setCategoryValue] = useState(currentParams.category || '')
  const [minPriceValue, setMinPriceValue] = useState(currentParams.minPrice || '')
  const [maxPriceValue, setMaxPriceValue] = useState(currentParams.maxPrice || '')
  const [sortBy, setSortBy] = useState(currentParams.sortBy || 'createdAt')
  const [sortOrder, setSortOrder] = useState(currentParams.sortOrder || 'desc')

  const activeFiltersCount = [
    currentParams.search,
    currentParams.category,
    currentParams.minPrice,
    currentParams.maxPrice
  ].filter(Boolean).length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const params = new URLSearchParams()
    
    for (const [key, value] of formData.entries()) {
      if (value && value.toString().trim()) {
        params.set(key, value.toString())
      }
    }
    
    setIsOpen(false)
    window.location.href = `/shop?${params.toString()}`
  }

  const clearFilters = () => {
    setSearchValue('')
    setCategoryValue('')
    setMinPriceValue('')
    setMaxPriceValue('')
    setSortBy('createdAt')
    setSortOrder('desc')
    setIsOpen(false)
    window.location.href = '/shop'
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Medicines
          </SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Search className="h-4 w-4" />
              Search
            </label>
            <Input
              type="text"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Medicine name, brand..."
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag className="h-4 w-4" />
              Category
            </label>
            <Input
              type="text"
              name="category"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              placeholder="e.g., Antibiotics"
            />
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <DollarSign className="h-4 w-4" />
              Price Range (৳)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  type="number"
                  name="minPrice"
                  value={minPriceValue}
                  onChange={(e) => setMinPriceValue(e.target.value)}
                  placeholder="Min"
                  min="0"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="maxPrice"
                  value={maxPriceValue}
                  onChange={(e) => setMaxPriceValue(e.target.value)}
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              Sort By
            </label>
            <div className="space-y-3">
              <select
                name="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Date Added</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              <select
                name="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Quick Filters</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setMinPriceValue('')
                  setMaxPriceValue('100')
                }}
                className="text-xs"
              >
                Under ৳100
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCategoryValue('Antibiotics')}
                className="text-xs"
              >
                Antibiotics
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCategoryValue('Pain Relief')}
                className="text-xs"
              >
                Pain Relief
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSortBy('price')
                  setSortOrder('asc')
                }}
                className="text-xs"
              >
                Cheapest First
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Apply Filters
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
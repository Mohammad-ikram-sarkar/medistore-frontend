'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  X, 
  ChevronDown,
  DollarSign,
  Tag,
  Calendar,
  Package
} from 'lucide-react'

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

interface SearchFiltersProps {
  currentParams: SearchParams;
}

export function SearchFilters({ currentParams }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState(currentParams.search || '')
  const [categoryValue, setCategoryValue] = useState(currentParams.category || '')
  const [minPriceValue, setMinPriceValue] = useState(currentParams.minPrice || '')
  const [maxPriceValue, setMaxPriceValue] = useState(currentParams.maxPrice || '')
  const [sortBy, setSortBy] = useState(currentParams.sortBy || 'createdAt')
  const [sortOrder, setSortOrder] = useState(currentParams.sortOrder || 'desc')

  const hasActiveFilters = currentParams.search || currentParams.category || 
                          currentParams.minPrice || currentParams.maxPrice

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
    
    // Add all form values to params
    for (const [key, value] of formData.entries()) {
      if (value && value.toString().trim()) {
        params.set(key, value.toString())
      }
    }
    
    // Navigate to new URL
    window.location.href = `/shop?${params.toString()}`
  }

  const clearFilters = () => {
    window.location.href = '/shop'
  }

  const removeFilter = (filterKey: string) => {
    const params = new URLSearchParams(window.location.search)
    params.delete(filterKey)
    params.delete('page') // Reset to first page when removing filters
    window.location.href = `/shop?${params.toString()}`
  }

  return (
    <Card className="bg-white shadow-sm border-0 ring-1 ring-gray-200">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search medicines by name, brand, or description..."
              className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {currentParams.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Search className="h-3 w-3" />
                  {currentParams.search}
                  <button
                    type="button"
                    onClick={() => removeFilter('search')}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {currentParams.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {currentParams.category}
                  <button
                    type="button"
                    onClick={() => removeFilter('category')}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(currentParams.minPrice || currentParams.maxPrice) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {currentParams.minPrice && `৳${currentParams.minPrice}`}
                  {currentParams.minPrice && currentParams.maxPrice && ' - '}
                  {currentParams.maxPrice && `৳${currentParams.maxPrice}`}
                  <button
                    type="button"
                    onClick={() => {
                      removeFilter('minPrice')
                      removeFilter('maxPrice')
                    }}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>

            <div className="flex items-center gap-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              {/* Category Filter */}
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
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <DollarSign className="h-4 w-4" />
                  Min Price (৳)
                </label>
                <Input
                  type="number"
                  name="minPrice"
                  value={minPriceValue}
                  onChange={(e) => setMinPriceValue(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <DollarSign className="h-4 w-4" />
                  Max Price (৳)
                </label>
                <Input
                  type="number"
                  name="maxPrice"
                  value={maxPriceValue}
                  onChange={(e) => setMaxPriceValue(e.target.value)}
                  placeholder="1000"
                  min="0"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  Sort By
                </label>
                <div className="flex gap-2">
                  <select
                    name="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="createdAt">Date Added</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                  <select
                    name="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="desc">High to Low</option>
                    <option value="asc">Low to High</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Quick Filter Suggestions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm text-gray-500">Quick filters:</span>
            <button
              type="button"
              onClick={() => {
                setMinPriceValue('')
                setMaxPriceValue('100')
                setCategoryValue('')
              }}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              Under ৳100
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryValue('Antibiotics')
                setMinPriceValue('')
                setMaxPriceValue('')
              }}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              Antibiotics
            </button>
            <button
              type="button"
              onClick={() => {
                setCategoryValue('Pain Relief')
                setMinPriceValue('')
                setMaxPriceValue('')
              }}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              Pain Relief
            </button>
            <button
              type="button"
              onClick={() => {
                setSortBy('price')
                setSortOrder('asc')
              }}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              Cheapest First
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
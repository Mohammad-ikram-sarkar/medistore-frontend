'use client'

import Shop from '@/components/module/shop'
import { medicine } from '../../../types/medicine.type'

export function ShopCardDemo() {
  // Sample medicine data with long description
  const sampleMedicine: medicine = {
    id: "demo-1",
    name: "Paracetamol Extra Strength 500mg Tablets",
    brand: "HealthCare Plus",
    categoryId: "pain-relief",
    authorId: "seller-1",
    description: "Paracetamol Extra Strength is a fast-acting pain reliever and fever reducer that provides effective relief from headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers. Each tablet contains 500mg of paracetamol, which is the maximum strength available over-the-counter. This medication works by blocking the production of certain natural substances that cause pain and fever. It's suitable for adults and children over 12 years old. Always read the label and follow the dosage instructions carefully. Do not exceed the recommended dose.",
    price: 150,
    expiryDate: "2025-12-31",
    quantity: 25,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    reviews: []
  }

  const sampleMedicineShort: medicine = {
    id: "demo-2", 
    name: "Vitamin C 1000mg",
    brand: "NutriMax",
    categoryId: "vitamins",
    authorId: "seller-2",
    description: "High potency Vitamin C supplement for immune support.",
    price: 85,
    expiryDate: "2026-06-15",
    quantity: 0, // Out of stock
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=400&h=400&fit=crop",
    reviews: []
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Enhanced Shop Card Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card with long description */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Long Description Example</h3>
            <Shop medicine={sampleMedicine} />
          </div>
          
          {/* Card with short description */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Short Description Example</h3>
            <Shop medicine={sampleMedicineShort} />
          </div>
          
          {/* Another card */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">In Stock Example</h3>
            <Shop medicine={{
              ...sampleMedicine,
              id: "demo-3",
              name: "Aspirin 325mg",
              description: "Fast-acting pain relief for headaches and minor aches.",
              price: 45,
              quantity: 100
            }} />
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Enhanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description Handling</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatically truncates long descriptions (80+ characters)</li>
                <li>• "Read More" / "Read Less" toggle functionality</li>
                <li>• Smooth text expansion without layout shifts</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Enhanced UI</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Stock status indicator with color coding</li>
                <li>• Wishlist functionality with heart icon</li>
                <li>• Better button layout and sizing</li>
                <li>• Expiry date display</li>
                <li>• Improved typography and spacing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
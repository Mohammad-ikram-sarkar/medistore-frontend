import React, { useState } from 'react';

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

const MedicineCreate: React.FC<MedicineCreateProps> = ({ categories, authorId }) => {
  const [medicineName, setMedicineName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission
    console.log({
      authorId,
      medicineName,
      categoryId: selectedCategory,
    });
  };

  return (
    <div>
      <h2>Create Medicine</h2>
      <p>Author ID: {authorId}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="medicineName">Medicine Name:</label>
          <input
            id="medicineName"
            name="medicineName"
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add more fields here, e.g., description, dosage, etc. */}

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default MedicineCreate;

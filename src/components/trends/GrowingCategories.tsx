
import React from 'react';

interface Category {
  name: string;
  growth: string;
  color: string;
}

interface GrowingCategoriesProps {
  categories: Category[];
}

const GrowingCategories = ({ categories }: GrowingCategoriesProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Categorie in Crescita</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((category, i) => (
          <div 
            key={i} 
            className={`px-2 py-1 rounded-md text-xs flex items-center ${category.color}`}
          >
            <span>{category.name}</span>
            <span className="ml-1 font-medium">{category.growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowingCategories;

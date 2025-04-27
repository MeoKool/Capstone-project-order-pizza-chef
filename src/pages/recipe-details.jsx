"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

export function RecipeDetails({ recipes }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
      >
        <BookOpen className="h-4 w-4" />
        {isOpen ? "Ẩn công thức" : "Xem công thức"}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 bg-green-50 p-3 rounded-md border border-green-100">
          <h4 className="font-medium text-sm mb-2">Nguyên liệu:</h4>
          <ul className="space-y-1.5">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="text-sm flex justify-between">
                <span>{recipe.ingredientName}</span>
                <span className="font-medium">
                  {recipe.quantity} {recipe.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

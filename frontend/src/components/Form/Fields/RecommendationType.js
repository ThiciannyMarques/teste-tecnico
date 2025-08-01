import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Tipo de Recomendação:
      </h2>
      <div className="flex items-center p-3">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="h-4 w-4"
        />
        <label htmlFor="SingleProduct" className="text-gray-700 mr-10">
          Produto Único
        </label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="h-4 w-4"
        />
        <label htmlFor="MultipleProducts" className="text-gray-700">
          Múltiplos Produtos
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;

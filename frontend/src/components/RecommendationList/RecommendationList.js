import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Lista de Recomendações:
      </h2>
      {recommendations.length === 0 && (
        <p className="text-gray-500 italic py-2">
          Nenhuma recomendação encontrada.
        </p>
      )}
      <ul className="divide-y divide-gray-100">
        {recommendations.map((recommendation, index) => (
          <li key={index} className=" text-gray-700 font-medium py-3 px-5">
            {recommendation.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationList;

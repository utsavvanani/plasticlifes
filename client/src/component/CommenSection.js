// src/components/CommenSection.js
import React from 'react';

function CommenSection({ title, description }) {
  return (
    <div className="bg-gray-100 py-12 mb-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {description}
          </p>
        )}
        <div className="border-t-2 border-gray-300 mt-8"></div>
      </div>
    </div>
  );
}

export default CommenSection;

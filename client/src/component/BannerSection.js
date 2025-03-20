import React from 'react';
import banner1 from '../assets/PlasticFoodStorageContainers.png';
import banner2 from '../assets/png-clipart-plastic-bag-tableware-plastic-film-kitchen-kitchen-miscellaneous-kitchen-thumbnail.png';
import banner3 from '../assets/h3.jpg';
import banner4 from '../assets/p1.png';

const banners = [
  { src: banner1, alt: 'HomeDecor', label: 'HomeDecor' },
  { src: banner2, alt: 'Kitchenware', label: 'Kitchenware' },
  { src: banner3, alt: 'PersonalCare', label: 'PersonalCare' },
  { src: banner4, alt: 'PersonalCare', label: 'PersonalCare' },
];

function BannerSection() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {banners.map((banner, index) => (
          <div key={index} className="relative group">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform group-hover:scale-105">
              <img
                src={banner.src}
                className="w-full h-64 object-cover"
                alt={banner.alt}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold text-center px-4 py-2">
                  {banner.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerSection;

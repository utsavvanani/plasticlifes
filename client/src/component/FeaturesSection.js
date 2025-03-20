// FeaturesSection.js
import React from 'react';
import { FaShippingFast, FaDollarSign, FaHeadset, FaShieldAlt } from 'react-icons/fa';

function FeaturesSection() {
  const features = [
    {
      icon: <FaShippingFast />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders over $50.',
    },
    {
      icon: <FaDollarSign />,
      title: 'Best Prices',
      description: 'We offer the most competitive prices in the market.',
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Support',
      description: 'Our support team is available 24/7 to assist you.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Shopping',
      description: 'Your data is protected with our top-notch security systems.',
    },
  ];

  return (
    <div className="bg-white py-12 my-24">
      <div className="container mx-auto px-4 text-center">
        <p className="text-3xl font-bold text-[#212121] mb-8">Why Shop With Us?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-5xl text-[#FF7004] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#212121] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;

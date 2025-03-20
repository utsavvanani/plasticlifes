// TestimonialsSection.js
import React from 'react';

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'John Doe',
      review: 'Amazing products! I am very happy with my purchase.',
      rating: 5,
    },
    {
      name: 'Jane Smith',
      review: 'Excellent customer service and fast delivery.',
      rating: 4,
    },
    {
      name: 'Mark Wilson',
      review: 'Great quality and affordable prices.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-3xl font-bold text-[#212121] mb-8">What Our Customers Say</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-[#FF7004] mb-2">{testimonial.name}</p>
              <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
              <p className="text-yellow-500">{"★".repeat(testimonial.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;

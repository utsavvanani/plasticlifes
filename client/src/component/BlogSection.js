// BlogSection.js
import React from 'react';

function BlogSection() {
  const blogPosts = [
    {
      title: 'How to Choose the Perfect Pair of Glasses',
      description: 'Finding the right glasses can be challenging. Here are some tips to help you.',
      image: 'https://example.com/image1.jpg',
    },
    {
      title: 'Top Trends in Eyewear for 2024',
      description: 'Stay ahead of the fashion curve with these eyewear trends.',
      image: 'https://example.com/image2.jpg',
    },
    {
      title: 'Caring for Your Glasses',
      description: 'Extend the life of your glasses with these care tips.',
      image: 'https://example.com/image3.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <p className="text-3xl font-bold text-[#212121] mb-8 text-center">Latest from Our Blog</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold text-[#212121] mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;

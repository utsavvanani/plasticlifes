import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../component/ProductCard";
import { get_product } from "../api/Api";
import CommenSection from "../component/CommenSection";
import Header from "../component/Header";
import Footer from "../component/Footer";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

function Kitchenware() {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    get_product()
      .then((res) => {
        const filteredProducts = res.filter(product => product.productCategory === 'Kitchenware');
        setAllProduct(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <CommenSection title="Plastic Household Goods" />
        </motion.div>

        {/* Feature Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          {/* Gradient Info Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 p-8 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">
              Why Choose Our Plastic Goods?
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Durable and long-lasting</li>
              <li>Eco-friendly options available</li>
              <li>Affordable and versatile</li>
              <li>Stylish and practical designs</li>
            </ul>
          </div>

          {/* Gradient Info Card */}
          <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-white p-8 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Available Products
            </h2>
            <p className="text-lg text-gray-700">
              Choose from a variety of plastic household goods, from storage solutions to kitchen essentials, all designed to make your life easier.
            </p>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Explore Our Plastic Goods Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProduct.length > 0 ? (
              allProduct.map((val, index) => (
                <ProductCard key={index} data={val} />
              ))
            ) : (
              <p className="text-center text-gray-700 col-span-full">
                No products available.
              </p>
            )}
          </div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            What Our Customers Say
          </h2>
          <div className="space-y-6">
            <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 italic mb-2">
                "The plastic storage boxes are a lifesaver! They’re sturdy and look great in my kitchen."
              </p>
              <p className="text-lg text-gray-800 font-semibold">- Emily R.</p>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 italic mb-2">
                "Amazing quality for the price. I love the eco-friendly options too!"
              </p>
              <p className="text-lg text-gray-800 font-semibold">- John D.</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Upgrade Your Home?
          </h2>
          <button className="text-white bg-green-600 hover:bg-green-700 py-3 px-8 font-semibold rounded-lg transition">
            Shop Plastic Goods Now
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>

  );
}

export default Kitchenware;

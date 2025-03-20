import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommenSection from "../component/CommenSection";
import { get_product } from "../api/Api";
import ProductCard from "../component/ProductCard";
import Header from "../component/Header";
import Footer from "../component/Footer";

const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

function PersonalCare() {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    get_product()
      .then((res) => {
        const filteredProducts = res.filter(
          (product) => product.productCategory === "Personal Care"
        );
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
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={slideInVariants}
        >
          <CommenSection title="Plastic Household Goods" />
          <p className="text-lg text-[#474747] mb-12">
            Discover our wide range of plastic household goods that blend durability and practicality. Perfect for modern homes and daily use.
          </p>
        </motion.div>

        {/* Product Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={scaleVariants}
        >
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-[#212121] mb-4">Durable & Lightweight</h3>
            <p className="text-lg text-[#474747] mb-4">
              Made from high-quality materials, our plastic goods are designed to withstand daily use while remaining lightweight.
            </p>
            <button className="bg-[#FF7004] text-white py-2 px-4 rounded-lg">Shop Now</button>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-[#212121] mb-4">Eco-Friendly Options</h3>
            <p className="text-lg text-[#474747] mb-4">
              Choose from our eco-friendly range, made from recycled plastic, to reduce your carbon footprint.
            </p>
            <button className="bg-[#FF7004] text-white py-2 px-4 rounded-lg">Shop Now</button>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-[#212121] mb-4">Versatile Designs</h3>
            <p className="text-lg text-[#474747] mb-4">
              From storage solutions to kitchenware, our plastic goods come in versatile designs that suit any home.
            </p>
            <button className="bg-[#FF7004] text-white py-2 px-4 rounded-lg">Shop Now</button>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Explore Our Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProduct?.map((val, index) => (
              <ProductCard key={index} data={val} />
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="bg-[#f7f7f7] p-8 rounded-lg shadow-md text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={slideInVariants}
        >
          <h2 className="text-3xl font-bold text-[#212121] mb-6">What Our Customers Say</h2>
          <p className="text-lg text-[#474747] mb-4">
            "The plastic storage containers are perfect for organizing my kitchen. They're durable and eco-friendly, which I love!"
          </p>
          <p className="text-lg text-[#474747]">- Emma J.</p>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={scaleVariants}
        >
          <h2 className="text-3xl font-bold text-[#212121] mb-6">Why Choose Our Products?</h2>
          <p className="text-lg text-[#474747] mb-6">
            Our plastic household goods are designed with sustainability and practicality in mind. Whether you're looking for storage, kitchenware, or eco-friendly solutions, we have the perfect products for your home.
          </p>
          <button className="bg-[#FF7004] text-white py-3 px-6 rounded-lg font-semibold">
            Learn More
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>

  );
}

export default PersonalCare;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommenSection from "../component/CommenSection";
import { get_product } from "../api/Api";
import ProductCard from "../component/ProductCard";
import Header from "../component/Header";
import Footer from "../component/Footer";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

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

function HomeDecor() {
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    get_product()
      .then((res) => {
        const filteredProducts = res.filter(
          (product) => product.productCategory === "Home Decor"
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
      <motion.div
        className="container mx-auto py-12 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <CommenSection title="Plastic Household Goods" />

        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <p className="text-lg text-[#474747] mb-12">
            Discover durable, eco-friendly plastic household goods that offer functionality and style for your home.
          </p>
        </motion.div>

        {/* Section 1: Product Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-[#e7e7e7] p-8 rounded-lg shadow-md"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h2 className="text-2xl font-semibold text-[#212121] mb-4">
              Eco-Friendly
            </h2>
            <p className="text-lg">
              Our plastic products are designed with sustainability in mind, helping reduce waste and promote reusability.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#e7e7e7] p-8 rounded-lg shadow-md"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h2 className="text-2xl font-semibold text-[#212121] mb-4">
              Durable & Lightweight
            </h2>
            <p className="text-lg">
              Made from high-quality materials, our products are durable, yet lightweight for easy handling.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#e7e7e7] p-8 rounded-lg shadow-md"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h2 className="text-2xl font-semibold text-[#212121] mb-4">
              Versatile Design
            </h2>
            <p className="text-lg">
              From storage solutions to kitchen essentials, our plastic goods are versatile for everyday use.
            </p>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Explore Our Plastic Goods Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProduct?.map((val, index) => (
              <ProductCard key={index} data={val} />
            ))}
          </div>
        </div>

        {/* Section 2: Customer Reviews */}
        <motion.div
          className="bg-[#f7f7f7] p-8 rounded-lg shadow-md text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h2 className="text-3xl font-bold text-[#212121] mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#474747]">
            "I love these plastic storage boxes! They are lightweight, durable, and look great in my home."
          </p>
          <p className="text-lg text-[#474747] mt-4">- Satisfied Customer</p>
        </motion.div>
      </motion.div>
      <Footer />
    </div>

  );
}

export default HomeDecor;

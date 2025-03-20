import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { get_product } from "../api/Api";
import ProductCard from "../component/ProductCard";
import FeaturesSection from "../component/FeaturesSection";
import TestimonialsSection from "../component/TestimonialsSection";
import Context from "../context";
import { Link } from "react-router-dom";
import hero from "../assets/h2.jfif"
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

const imgVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

function Home() {
  const [allProduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [category, setCategory] = useState("all"); // New state for category filter
  const { user } = useContext(Context);

  // Replace with new banner images related to Home Decor and Kitchenware
  const banner1Image = "https://yourimageurl.com/home_decor_banner.jpg";
  const banner2Image = "https://yourimageurl.com/kitchenware_banner.jpg";

  useEffect(() => {
    get_product()
      .then((res) => {
        setAllProduct(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    category === "all" ? allProduct : allProduct.filter((product) => product.productCategory === category);

  // Calculate products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div>
      <Header />
      <div className="overflow-x-hidden bg-[#f4f4f4]">
        <div className="relative">
          {user?.role === "admin" && (
            <div className="fixed z-50 right-10 bottom-10 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
              <Link to="/admin">
                <p className="text-sm">Admin</p>
              </Link>
            </div>
          )}

          {/* Header Banner Section */}
          <div className="container mx-auto px-4 py-12 md:flex md:flex-row items-center bg-white shadow-lg rounded-lg">
            {/* Left Section for Text Content */}
            <motion.div
              className="md:w-1/2 p-6 space-y-6"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {/* Section Title */}
              <p className="text-lg font-semibold text-[#474747] mb-2 uppercase tracking-wide">
                Explore Our Plastic Life Collection
              </p>

              {/* Headline with Gradient Text */}
              <div className="w-full text-left py-4">
                <h2
                  className="font-extrabold tracking-wide leading-tight"
                  style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 4.5rem)' }}
                >
                  <span className="text-gray-800">Bring Style to Your </span>
                  {/* Gradient Part for Emphasis */}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FDC830] to-[#F37335]">
                    Home Decor
                  </span>{" "}
                  and{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09C6F9] to-[#045DE9]">
                    Kitchenware
                  </span>
                </h2>
              </div>

              {/* Description Text */}
              <p className="text-[#474747] mb-6 text-base leading-relaxed">
                Discover our range of stylish and practical plastic goods designed for modern living. Whether it's for your home decor or kitchen, our collection offers versatile and elegant solutions.
              </p>

              {/* Call-to-Action Button */}
              <button className="text-white bg-gradient-to-r from-[#FF7004] to-[#FFB74D] hover:bg-gradient-to-r hover:from-[#212121] hover:to-[#474747] py-3 px-6 font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105">
                <Link to="/HomeDecor">
                  Shop Now
                </Link>

              </button>
            </motion.div>

            {/* Right Section for Image or Illustration */}
            <motion.div
              className="md:w-1/2 flex justify-center items-center"
              initial="hidden"
              animate="visible"
              variants={imgVariants}
            >
              {/* Placeholder for Image: Replace with actual image */}
              <img
                src={hero}
                alt="Plastic Life Collection"
                className="w-3/4 h-auto object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              />
            </motion.div>
          </div>

        </div>

        {/* Category Buttons */}
        <div className="container mx-auto px-4 py-8 text-center">
          <button
            onClick={() => setCategory("all")}
            className={`mx-2 px-4 py-2 font-semibold rounded-lg ${category === "all" ? "bg-[#FF7004] text-white" : "bg-gray-200"}`}
          >
            All Products
          </button>
          <button
            onClick={() => setCategory("Home Decor")}
            className={`mx-2 px-4 py-2 font-semibold rounded-lg ${category === "Home Decor" ? "bg-[#FF7004] text-white" : "bg-gray-200"}`}
          >
            Home Decor
          </button>
          <button
            onClick={() => setCategory("Kitchenware")}
            className={`mx-2 px-4 py-2 font-semibold rounded-lg ${category === "Kitchenware" ? "bg-[#FF7004] text-white" : "bg-gray-200"}`}
          >
            Kitchenware
          </button>
        </div>

        {/* Product List Section */}
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-3xl font-bold text-[#212121] mb-4">Our Plastic Life Products</p>
          <p className="text-lg text-[#474747] max-w-3xl mx-auto mb-6">
            Explore our diverse range of home decor and kitchenware products, perfect for organizing, storage, and more!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentProducts.map((val, index) => (
              <ProductCard key={index} data={val} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded disabled:opacity-50">
              Previous
            </button>
            <span className="px-4 py-2 mx-2 text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </div>

        <FeaturesSection className="my-12" />
        <TestimonialsSection className="my-12" />

        {/* Updated Banners Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner 1 - Home Decor */}
            <div className="relative flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 h-64 md:h-80 lg:h-96" style={{ backgroundImage: `url(${banner1Image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="flex flex-col justify-center items-center p-6 md:p-8 bg-black h-[inherit] bg-opacity-50 text-white text-center rounded-lg">
                <h3 className="text-2xl md:text-4xl font-bold">Home Decor</h3>
                <p className="mt-2 mb-4 text-lg">Style your home with our exclusive collection of modern plastic home decor items.</p>
                <button className="px-6 py-3 font-semibold bg-[#FF7004] hover:bg-[#212121] text-white rounded transition">
                  <Link to="/HomeDecor">
                    Shop Home Decor
                  </Link>

                </button>
              </div>
            </div>

            {/* Banner 2 - Kitchenware */}
            <div className="relative flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 h-64 md:h-80 lg:h-96" style={{ backgroundImage: `url(${banner2Image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="flex flex-col justify-center items-center p-6 md:p-8 bg-black h-[inherit] bg-opacity-50 text-white text-center rounded-lg">
                <h3 className="text-2xl md:text-4xl font-bold">Kitchenware</h3>
                <p className="mt-2 mb-4 text-lg">Explore our range of plastic kitchenware products designed for functionality and style.</p>
                <button className="px-6 py-3 font-semibold bg-[#FF7004] hover:bg-[#212121] text-white rounded transition">
                  <Link to="/Kitchenware">
                    Shop Kitchenware
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Home;

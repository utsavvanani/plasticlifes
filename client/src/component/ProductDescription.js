import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addToCart, addToWishlist, findProductById } from "../api/Api";
import { useParams } from "react-router-dom";
import Context from "../context";
import {  FaRegHeart } from "react-icons/fa"; 

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const zoomBoxVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

function ProductDescription() {
  const { countproduct } = useContext(Context);
  const addToCartHandler = async (productId) => {
    try {
      const response = await addToCart(productId);
      await countproduct();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addtowishlist = async (productId) => {
    await addToWishlist(productId);
  };
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showZoom, setShowZoom] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await findProductById(productId);
      setProduct(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  },[productId]);

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  if (!product)
    return <div className="text-center text-gray-600">Product not found</div>;

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 my-14"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative flex flex-col md:flex-row">
        <div
          className="relative w-[100px] h-auto md:w-2/3  mb-6 md:mb-0 md:mr-6 overflow-hidden"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
        >
          <motion.img
            src={product.productImage}
            alt={product.productTitle}
            className="w-full h-full object-cover rounded-lg"
            variants={imageVariants}
            transition={{ duration: 0.3 }}
          />
          {showZoom && (
            <motion.div
              className="absolute top-full mt-4 left-0 w-64 h-64 border border-gray-300 bg-white shadow-lg overflow-hidden"
              variants={zoomBoxVariants}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={product.productImage}
                alt={product.productTitle}
                className="w-full h-full object-cover transform scale-150"
                variants={imageVariants}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </div>
        <motion.div
          className="flex flex-col justify-between p-4 md:w-1/3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.productTitle}
          </h1>
          <p className="text-gray-600 mb-4">{product.productDesc}</p>
          <div className="flex items-center mb-4">
            <span className="text-gray-500 text-lg mr-2">Category:</span>
            <span className="text-gray-800 font-semibold">
              {product.productCategory}
            </span>
          </div>
          <button
          className="flex items-center text-gray-700 hover:text-red-600 transition-transform transform"
          onClick={() => addtowishlist(product?._id)}
        >
          <FaRegHeart className="text-xl mr-2" />
          <span className="font-medium text-base">Wishlist</span>
        </button>
          {product.productFakePrice && (
            <div className="text-gray-500 line-through mb-4">{`$${product.productFakePrice.toFixed(
              2
            )}`}</div>
          )}
          <div className="text-red-600 font-bold text-2xl mb-6">{`$${product.productPrice.toFixed(
            2
          )}`}</div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => addToCartHandler(product?._id)}>
            Add to Cart
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDescription;

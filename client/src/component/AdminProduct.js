import React, { useEffect, useState } from 'react';
import { addAdminProduct, deleteAdminProduct, get_product, updateAdminProduct } from '../api/Api';
import { FadeLoader } from 'react-spinners';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import UploadImage from '../helper/UploadImage';

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [productData, setProductData] = useState({
    productTitle: '',
    productDesc: '',
    productImage: '',
    productPrice: '',
    productCategory: '',
    productFakePrice: ''
  });

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await get_product();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProductHandler = async (productId) => {
    await deleteAdminProduct(productId);
    fetchProducts();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateAdminProduct(currentProductId, productData);
    } else {
      await addAdminProduct(productData);
    }

    setShowModal(false);
    fetchProducts();
    resetForm();
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);

      const uploadImageCloudinary = await UploadImage(file);
      setProductData((prev) => ({
        ...prev,
        productImage: uploadImageCloudinary.url,
      }));
    }
  };

  const resetForm = () => {
    setProductData({
      productTitle: '',
      productDesc: '',
      productImage: '',
      productPrice: '',
      productCategory: '',
      productFakePrice: ''
    });
    setPreviewImage('');
    setIsEditing(false);
    setCurrentProductId(null);
  };

  const handleEditClick = (product) => {
    setProductData(product);
    setCurrentProductId(product._id);
    setIsEditing(true);
    setPreviewImage(product.productImage);
    setShowModal(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products.filter(product =>
      product.productTitle && product.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(updatedProducts);
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FadeLoader
          color="#3498db"
          height={13}
          margin={2}
          radius={2}
          speedMultiplier={0.75}
          width={5}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className='flex flex-col sm:flex-row justify-between items-center my-3'>
        <h2 className="text-2xl font-semibold mb-4 sm:mb-0 text-gray-800">Products</h2>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition flex items-center"
        >
          <FaPlus className="w-5 h-5" />
          <span className="ml-2">Add New Product</span>
        </button>
      </div>

      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src={product.productImage}
                alt={product.productTitle}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.productTitle}</h3>
                <p className="text-gray-600 mt-1">{product.productDesc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-900 font-bold">
                  ₹{product.productPrice && typeof product.productPrice === 'number' ? product.productPrice.toFixed(2) : 'N/A'}
                  </span>
                  <span className="text-gray-600 text-sm">{product.productCategory}</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    aria-label="Edit Product"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteProductHandler(product._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                    aria-label="Delete Product"
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding/Editing Product */}
      {showModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center overflow-y-scroll pt-[400px] pb-[30px] bg-[black] bg-opacity-20">
          <div className=" p-4 bg-[#1F2937]    rounded-lg shadow-lg max-w-full sm:max-w-2xl w-full text-white">
            <h3 className="text-xl font-semibold mb-6 text-center bg-[#957C7C] rounded-t-[10px] text-white py-[10px]">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={onSubmitHandler} className="rounded-[20px] space-y-6 max-w-[550px] mx-auto border-[#936b6b] border-[2px] shadow-md p-4">
              <div>
                <label className="block  mb-2">Product Title</label>
                <input
                  type="text"
                  name="productTitle"
                  value={productData.productTitle}
                  onChange={onChangeHandler}
                  className="border border-gray-300 rounded-lg p-3 w-full bg-[#535c69]"
                  required
                />
              </div>
              <div>
                <label className="block  mb-2">Description</label>
                <textarea
                  name="productDesc"
                  value={productData.productDesc}
                  onChange={onChangeHandler}
                  className="border border-gray-300 rounded-lg p-3 w-full bg-[#535c69]"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className='flex justify-between items-center gap-1'>
                <div>
                  <label className="block  mb-2">Image</label>
                  <input
                    type="file"
                    onChange={handleUploadProduct}
                    className="border border-gray-300 rounded-lg p-3  bg-[#535c69]"
                  />
                </div>
                {previewImage && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-[100px] mx-auto h-auto bg-[#ffffff] rounded-[10px] my-auto border-gray-300"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block  mb-2">Price</label>
                <input
                  type="number"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={onChangeHandler}
                  className="border border-gray-300 rounded-lg p-3 w-full bg-[#535c69]"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block  mb-2">Category</label>
                <select
                  name="productCategory"
                  value={productData.productCategory}
                  onChange={onChangeHandler}
                  className="border border-gray-300 rounded-lg p-3 w-full bg-[#535c69]"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Home Decor">Home Decor</option>
                </select>
              </div>
              <div>
                <label className="block  mb-2">Offer Price</label>
                <input
                  type="text"
                  name="productFakePrice"
                  value={productData.productFakePrice}
                  onChange={onChangeHandler}
                  className="border border-gray-300 rounded-lg p-3 w-full bg-[#535c69]"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white p-3 rounded mr-2 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                >
                  {isEditing ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminProduct;

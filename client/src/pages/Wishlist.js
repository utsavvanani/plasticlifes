import React, { useEffect, useState } from 'react';
import { deleteWishlist, getWishlist } from '../api/Api';
import CommenSection from '../component/CommenSection';
import WishlistCard from '../component/WishlistCard';
import Header from '../component/Header';
import Footer from '../component/Footer';

function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getWishlist();
      setData(res);
    } catch (err) {
      setError('Failed to fetch wishlist items.');
    } finally {
      setLoading(false);
    }
  };

  const deleteWishlistHandler = async (productId) => {
    await deleteWishlist(productId)
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header />
      <CommenSection title="Wishlist" />

      <div className="container mx-auto py-12 px-10">
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item) => (
              <WishlistCard key={item._id} data={item.productId} onRemove={deleteWishlistHandler}></WishlistCard>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Your wishlist is empty.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;

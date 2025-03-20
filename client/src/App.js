import React, { useState, useEffect } from 'react';
import Layout from './component/Layout';
import Loader from './component/Loader';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    // Clean up the timer if the component unmounts before the timer completes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <Layout />}
    </div>
  );
}

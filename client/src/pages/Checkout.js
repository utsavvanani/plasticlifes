// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import CommenSection from '../component/CommenSection';

// function Checkout() {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');

//   // Load user data from local storage on component mount
//   useEffect(() => {
//     const data = localStorage.getItem('userData');
//     if (data) {
//       const userData = JSON.parse(data);
//       setName(userData.name || '');
//       setEmail(userData.email || '');
//       setPhone(userData.phone || '');
//       setAddress(userData.address || '');
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userData = { name, email, phone, address };
//     localStorage.setItem('userData', JSON.stringify(userData));
//     navigate("/bill");
//   };

//   return (
//     <div className='bg-[black]'>
//       <div className="container mx-auto py-12 px-4">
//         <CommenSection title="Checkout" />
//         <form onSubmit={handleSubmit} className="rounded-[20px] space-y-6 max-w-[550px] mx-auto border-[#936b6b] border-[2px] shadow-md p-4">
//           <div className='shadow'>
//             <label className="block text-white font-serif font-thin bg-[#2F333A] p-2 rounded-t-[10px]">Name<span className='text-[red]'>*</span></label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="border p-3 w-full rounded-b-[5px]"
//             />
//           </div>

//           <div className='shadow'>
//             <label className="block text-white font-serif font-thin bg-[#2F333A] p-2 rounded-t-[10px]">Email<span className='text-[red]'>*</span></label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="border p-3 w-full rounded-b-[5px]"
//             />
//           </div>

//           <div className='shadow'>
//             <label className="block text-white font-serif font-thin bg-[#2F333A] p-2 rounded-t-[10px]">Phone<span className='text-[red]'>*</span></label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               className="border p-3 w-full rounded-b-[5px]"
//             />
//           </div>

//           <div className='shadow'>
//             <label className="block text-white font-serif font-thin bg-[#2F333A] p-2 rounded-t-[10px]">Address<span className='text-[red]'>*</span></label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               className="border p-3 w-full rounded-b-[5px]"
//             />
//           </div>

//           <button type="submit" className="font-serif font-thin w-full text-white px-6 py-3 rounded-lg shadow-md bg-[#f79f1c] transition duration-200">
//             Process
//           </button>
//         </form>
//         <div>
//           <Link to={"/cart"}>
//             <button className="font-serif font-thin bg-[black] text-white px-6 py-3 rounded-lg shadow-lg border border-[#936b6b] transition duration-200 mt-5">Back</button>
//           </Link>
//         </div>
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600 font-serif font-thin">Secure payment processing through your preferred gateway.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommenSection from '../component/CommenSection';
import Header from '../component/Header';
import Footer from '../component/Footer';

function Checkout() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Load user data from local storage on component mount
  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      const userData = JSON.parse(data);
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
    }
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, phone, address };
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate("/bill");
  };

  return (
    <div>
      <Header />
      <div className="bg-[#FAF3E0]">
        <div className="container mx-auto py-12 px-4">
          <CommenSection title="Checkout" />
          <form onSubmit={handleSubmit} className="rounded-[20px] space-y-6 max-w-[550px] mx-auto border-[#b08968] border-[2px] shadow-md p-6 bg-[#F5F0E1]">
            <div className='shadow'>
              <label className="block text-[#6b4226] font-serif font-thin bg-[#D4B6A0] p-2 rounded-t-[10px]">Name<span className='text-[red]'>*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-3 w-full rounded-b-[5px] bg-[#FAF3E0]"
              />
            </div>

            <div className='shadow'>
              <label className="block text-[#6b4226] font-serif font-thin bg-[#D4B6A0] p-2 rounded-t-[10px]">Email<span className='text-[red]'>*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-3 w-full rounded-b-[5px] bg-[#FAF3E0]"
              />
            </div>

            <div className='shadow'>
              <label className="block text-[#6b4226] font-serif font-thin bg-[#D4B6A0] p-2 rounded-t-[10px]">Phone<span className='text-[red]'>*</span></label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border p-3 w-full rounded-b-[5px] bg-[#FAF3E0]"
              />
            </div>

            <div className='shadow'>
              <label className="block text-[#6b4226] font-serif font-thin bg-[#D4B6A0] p-2 rounded-t-[10px]">Address<span className='text-[red]'>*</span></label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border p-3 w-full rounded-b-[5px] bg-[#FAF3E0]"
              />
            </div>

            <button type="submit" className="font-serif font-thin w-full text-white px-6 py-3 rounded-lg shadow-md bg-[#8A5638] hover:bg-[#7a4e34] transition duration-200">
              Proceed to Payment
            </button>
          </form>
          <div>
            <Link to={"/cart"}>
              <button className="font-serif font-thin bg-[#D4B6A0] text-[#6b4226] px-6 py-3 rounded-lg shadow-lg border border-[#8A5638] transition duration-200 mt-5">
                Back to Cart
              </button>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6b4226] font-serif font-thin">Secure payment processing through your preferred gateway.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Checkout;

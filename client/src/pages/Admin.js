import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../component/Header';

function Admin() {
  return (
    <div>
      <Header/>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">

        <aside className="w-full md:w-64 bg-gray-800 text-white flex-shrink-0">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                    Users
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                    Products
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>

  );
}

export default Admin;

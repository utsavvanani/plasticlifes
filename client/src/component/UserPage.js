import React, { useContext, useEffect, useState } from 'react';
import { allUser, changeUserRole, currentUser, deleteUser } from '../api/Api';
import { FadeLoader } from 'react-spinners';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Context from '../context';

function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const { setUser, logoutHandler } = useContext(Context);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await allUser();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleRoleChange = (userId, role) => {
    setSelectedUser(userId);
    setSelectedRole(role);
    setShowModal(true);
  };


  const confirmRoleChange = async () => {
    await changeUserRole(selectedUser, selectedRole);
    fetchUsers();
    const res = await currentUser();
    if (res?.role !== "admin") {
      setUser(res);
      navigate("/");
    }
    setShowModal(false);
  };


  const cancelRoleChange = () => {
    setSelectedUser(null);
    setSelectedRole('');
    setShowModal(false);
  };


  const deleteUserHandler = async (userId) => {
    const res = await currentUser();
    await deleteUser(userId);
    fetchUsers();
    if (res?._id === userId) {
      await logoutHandler();
      navigate("/");
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FadeLoader color="#3498db" height={13} margin={2} radius={2} speedMultiplier={0.75} width={5} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-400">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="py-3 px-6 border-b font-semibold text-left">Username</th>
                <th className="py-3 px-6 border-b font-semibold text-left">Email</th>
                <th className="py-3 px-6 border-b font-semibold text-left">Role</th>
                <th className="py-3 px-6 border-b font-semibold text-left">Created At</th>
                <th className="py-3 px-6 border-b font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-6 border-b text-gray-800">{user.username}</td>
                  <td className="py-3 px-6 border-b text-gray-800">{user.email}</td>
                  <td className="py-3 px-6 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border border-gray-300 rounded-lg p-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 border-b text-gray-600">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 border-b">
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      aria-label="Delete User"
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Confirming Role Change */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Role Change</h3>
            <p className="mb-4">
              Are you sure you want to change the role to <strong>{selectedRole}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={cancelRoleChange}
                className="bg-gray-300 text-gray-800 rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRoleChange}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;

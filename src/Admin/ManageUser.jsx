import React, { useState, useEffect } from "react";
import { db } from "../Admin/firebase"; // Import Firebase Firestore instance
import {
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Import Firestore methods
import { toast } from "react-toastify";
import defaultUserIcon from "../Asset/images/user.png"; // Import default user icon

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "userdb");
        const snapshot = await getDocs(usersCollection);
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          profileImage: doc.data().profileImage || defaultUserIcon,
        }));
        setUsers(usersData);

        // Listen for real-time updates to user data
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
          const updatedUsersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            profileImage: doc.data().profileImage || defaultUserIcon,
          }));
          setUsers(updatedUsersData);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = async () => {
    try {
      await updateDoc(doc(db, "userdb", selectedUser.id), editFormData);
      toast.success("User information updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Error updating user information. Please try again later.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "userdb", userId));
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user. Please try again later.");
      }
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({ ...user });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setEditFormData(null);
    setIsEditModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search users by name"
          className="border border-gray-300 rounded px-3 py-1 w-full mr-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
              </td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleOpenEditModal(user)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div>
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={editFormData.firstName}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={editFormData.lastName}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={editFormData.role}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded px-3 py-1 w-full"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="candidate">candidate</option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleEditUser}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCloseEditModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;

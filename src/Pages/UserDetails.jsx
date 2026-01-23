import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!user) return <p className="text-center mt-20">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-start sm:items-center">
      <img
        src={`https://i.pravatar.cc/150?img=${user.id}`}
        alt={user.name}
        className="w-24 h-24 rounded-full mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-700 mt-1">Username: {user.username}</p>
      <p className="text-gray-700 mt-1">Email: {user.email}</p>
      <p className="text-gray-700 mt-1">Phone: {user.phone}</p>
      <p className="text-gray-700 mt-1">Company: {user.company.name}</p>
      <p className="text-gray-700 mt-1">
        Address: {user.address.suite}, {user.address.street}, {user.address.city}
      </p>
      <p className="text-gray-700 mt-1">Website: {user.website}</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Back to Users
      </Link>
    </div>
  );
}
export default UserDetails
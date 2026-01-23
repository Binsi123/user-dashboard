import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Componets/Cards";
import {  useForm } from "react-hook-form";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [showForm, setShowForm] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = (data) => {
    const newUser = {
      id: users.length + 1 + Math.floor(Math.random() * 100),
      name: data.name,
      username: data.name.split(" ")[0],
      email: data.email,
      company: { name: data.company },
      website: "example.com",
    };
    setUsers([newUser, ...users]);
    reset();
    setShowForm(false);
  };
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase());
    const matchesCompany = companyFilter
      ? user.company.name === companyFilter
      : true;
    return matchesSearch && matchesCompany;
  });

  const companyNames = [...new Set(users.map((user) => user.company.name))];

  if (loading)
    return (
      <p className="text-center mt-20 text-lg font-semibold">Loading...</p>
    );
  console.log("userList", users);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10">
      <div className="flex justify-between">
        <p className="flex text-2xl font-bold justify-start">User Dashboard</p>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-[#0a7f8f] text-white  rounded-lg hover:bg-blue-700"
        >
          +Add User
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-8">
        <input
          type="text"
          placeholder="Search by name or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />

        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Companies</option>
          {companyNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
              <Card
                name={user.name}
                username={user.username}
                email={user.email}
                company={user.company.name}
                website={user.website}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No results found
          </p>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[420px] p-6">
        
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add User</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Name"
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-3">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Email"
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm start-1">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  {...register("company", { required: "Company is required" })}
                  placeholder="Company"
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0a7f8f] text-white rounded-lg hover:bg-[#07666a] transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserList;

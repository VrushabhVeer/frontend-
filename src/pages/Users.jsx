import React, { useEffect, useState } from "react";
import { deleteUser, getUser } from "../utils/apis";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUser();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      enqueueSnackbar(res.data.message, { variant: "success" });
      setUsers((e) => e.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    navigate("/", { state: { user } });
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Registered Users</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-10">
        {users.map((item) => (
          <div
            className="flex flex-col md:flex-row gap-5 border rounded-md p-5 shadow-md"
            key={item._id}
          >
            <div className="w-full">
              <img
                className="w-full rounded-md"
                src={item.photo}
                alt="userimage"
                loading="lazy"
              />
            </div>
            <div className="w-full">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="mt-2">
                <span className="font-semibold">Name:</span> {item.email}
              </p>
              <p className="mt-2">
                <span className="font-semibold">UserName:</span> {item.userName}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Contact:</span> {item.contact}
              </p>

              <div className="flex items-center gap-5 mt-8">
                <div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 rounded-md text-white text-sm py-2 px-5 "
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-500 hover:bg-green-600 rounded-md text-white text-sm py-2 px-5 "
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SnackbarProvider />
    </div>
  );
};

export default Users;

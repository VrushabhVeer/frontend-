import React, { useState, useEffect } from "react";
import { registerUser, updateUser } from "../utils/apis";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = location.state?.user;
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUserName(user.userName);
      setContact(user.contact);
      setPhoto(user.photo);
      setUserId(user._id);
    }
  }, [location.state]);

  const payload = {
    name,
    email,
    userName,
    contact,
    photo,
  };

  const handleSave = async () => {
    if (!name || !email || !userName || !contact || !photo) {
      enqueueSnackbar("Please fill out all fields.", { variant: "warning" });
      return;
    }

    try {
      if (userId) {
        const res = await updateUser(userId, payload);
        enqueueSnackbar("User updated successfully.", { variant: "success" });
      } else {
        const res = await registerUser(payload);
        enqueueSnackbar("User registered successfully.", {
          variant: "success",
        });
      }
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Operation failed. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="mx-auto w-10/12 md:w-6/12 lg:w-4/12 mt-10">
      <h1 className="text-2xl font-bold text-center">
        {userId ? "Edit User" : "Register"}
      </h1>
      <div className="mt-5">
        <input
          className="w-full border border-slate-500 py-2 px-4 rounded-md"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mt-5">
        <input
          className="w-full border border-slate-500 py-2 px-4 rounded-md"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mt-5">
        <input
          className="w-full border border-slate-500 py-2 px-4 rounded-md"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mt-5">
        <input
          className="w-full border border-slate-500 py-2 px-4 rounded-md"
          type="number"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div className="mt-5">
        <input
          className="w-full border border-slate-500 py-2 px-4 rounded-md"
          type="text"
          placeholder="Profile Photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-red-500 hover:bg-red-600 py-3 w-full mt-8 rounded-md text-white"
      >
        {userId ? "Update" : "Register"}
      </button>

      <SnackbarProvider />
    </div>
  );
};

export default Register;

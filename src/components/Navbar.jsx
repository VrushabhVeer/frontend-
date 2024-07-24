import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-white sticky top-0 z-50 border">
        <div className="w-[90%] md:w-[85%] mx-auto flex h-16 items-center justify-between">
          <button className="md:hidden lg:hidden" onClick={handleToggle}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          <div>
            <Link to="/">
              <p className="font-playwrite font-semibold text-xl">Logo</p>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/">Register</Link>
            <Link to="/users">
              <span>Users</span>
            </Link>
          </div>
        </div>

        {isOpen ? (
          <div className="pb-5 pt-5 md:hidden">
            <div className="flex flex-col space-y-5 ml-2">
              <Link to="/">Register</Link>
              <Link to="/users">
                <span>Users</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

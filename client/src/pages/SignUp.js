import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SignupUser } from "../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CommenSection from "../component/CommenSection";

function SignUp() {
  const navigate = useNavigate();
  const [showconPassword, setConShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (e.target.conpassword.value === data.password) {
      const signupUser = await SignupUser(data);
      if (signupUser) {
        navigate("/login");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="container py-12 mx-auto bg-gray-50">
      {/* Header Section */}
      <CommenSection title="Create Your Account" />
      <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg bg-white mt-8">
        <div className="px-6 py-10">
          <form action="" className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
            {/* Username Field */}
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold text-gray-600">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                onChange={onChangeData}
                type="text"
                placeholder="Enter Username"
                className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                name="username"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold text-gray-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                onChange={onChangeData}
                type="email"
                placeholder="Enter Email"
                className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                name="email"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold text-gray-600">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={onChangeData}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="py-3 px-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  name="password"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <label htmlFor="confirm-password" className="font-semibold text-gray-600">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showconPassword ? "text" : "password"}
                  placeholder="Re-enter Password"
                  className="py-3 px-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  name="conpassword"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setConShowPassword(!showconPassword)}
                >
                  {showconPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              type="submit"
            >
              Sign Up
            </button>

            {/* Redirect to Login Button */}
            <Link to={"/login"}>
              <button
                className="bg-gray-800 w-full text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300 mt-3"
              >
                Already have an account? Log In
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

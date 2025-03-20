import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../api/Api";
import Context from "../context";
import CommenSection from "../component/CommenSection";

function Login() {
  const { countproduct, loginHandler } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await LoginUser(data);
      console.log("loginUser", loginUser);
      if (loginUser) {
        countproduct();
        await loginHandler();
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
 

  return (
    <div className="container py-16 mx-auto"> 
      <CommenSection title="Login"> </CommenSection>
      <div className="w-full  max-w-md mx-auto shadow-md ">
        <div className="px-4 py-8">
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={onSubmitHandler}
          >
            <label htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="py-2 px-2 border rounded"
              id="email"
              name="email"
              onChange={onChangeHandler}
            />

            <label htmlFor="password">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="py-2 px-2 border rounded"
              id="password"
              name="password"
              onChange={onChangeHandler}
            />

            <button className="bg-orange-500 mt-5 text-white py-2 rounded hover:bg-orange-600 transition duration-300">
              Login
            </button>
            <div className="flex flex-col md:flex-row justify-between mt-5 gap-3">
              <Link to={"/signup"}>
                <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300">
                  CREATE ACCOUNT
                </button>
              </Link>
              <Link to={"/forgot-password"}>
                <button className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition duration-300">
                  FORGOT PASSWORD
                </button>
              </Link>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

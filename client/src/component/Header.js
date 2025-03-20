
import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineHome } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { countproduct, logoutHandler, count, user } = useContext(Context);
  const navigate = useNavigate();
  countproduct();

  const logouthandler = async () => {
    await logoutHandler();
    navigate("/");
    // console.log("res", res);
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = async () => {
    await logouthandler();
    handleModalClose();
  };

  return (
    <>
      <div className="bg-[#ffffff] hidden lg:block">
        <div className="bg-[#2F333A] h-[40px]"></div>
        <div className="container p-4 mx-auto pb-[10px]">
          <div className="flex justify-between items-center">
            <Link to={"/"}>
              <div>
                <img src={logo} alt="" width={"80px"} className="mx-auto" height={"80px"} />
                <p className="font-bold text-[10px] text-[#51BC72] flex justify-center">PLASTCI LIFE</p>
              </div>
            </Link>
            <div className="flex items-center justify-between gap-8 text-[25px]">
              <span className="font-light">
                <Link to={"/wishlist"}>
                  <FaRegHeart className="hover:text-[#0083C7]" />
                </Link>
              </span>
              <span className="font-hairline relative">
                <Link to={"/cart"}>
                  <BsHandbag className="hover:text-[#0083C7]" />
                </Link>
                <p className="absolute top-[-10px] right-[-10px] bg-[#0083C7] rounded-full w-[20px] h-[20px] text-[14px] text-center text-white">
                  {count || 0}
                </p>
              </span>

              <span className="font-hairline">
                {user ? (
                  <p
                    onClick={handleLogoutClick}
                    className="cursor-pointer bg-[#0083C7] text-white px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 text-[15px]"
                  >
                    Logout
                  </p>
                ) : (
                  <Link to={"/login"}>
                    <p className="cursor-pointer bg-[#0083C7] text-white px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 text-[15px]">
                      Login
                    </p>
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-[#2F333A]">
          <div className="container mx-auto p-4">
            <div className="flex justify-center gap-14 text-[#ffffff] py-[5px] text-[18px] font-serif">
              <p className="hover:text-[#0083C7]">
                <Link to={"/"}>Home</Link>
              </p>
              <p className="hover:text-[#0083C7]">
                <Link to={"/about"}>About</Link>
              </p>
              <p className="hover:text-[#0083C7]">
                <Link to={"/Kitchenware"}>Kitchenware</Link>
              </p>
              <p className="hover:text-[#0083C7]">
                <Link to={"/HomeDecor"}>Home Decor</Link>
              </p>
              <p className="hover:text-[#0083C7]">
                <Link to={"/PersonalCare"}>Personal Care</Link>
              </p>
              <p className="hover:text-[#0083C7]">
                <Link to={"/contact"}>Contact</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff] shadow-md shadow-[#cbcfcf] block mt-0   lg:hidden  w-[100%] z-10">
        <div className="container mx-auto p-4 flex items-center">
          <div className="flex-auto w-14">
            <span
              className="text-[25px] hover:text-[#0083C7]"
              onClick={() => setSidebarOpen(true)}
            >
              <AiOutlineMenu />
            </span>
          </div>
          <Link to={"/"}>
            <div className="flex-auto w-70">
              <img
                src={logo}
                alt=""
                className="mx-auto"
                width={"50px"}
                height={"50px"}
              />
            </div>
          </Link>
          <div className="flex justify-end gap-8 text-[25px] flex-auto w-26 items-center">
            <span className="font-hairline hover:text-[#0083C7]">
              <FiSearch />
            </span>
            <span className="font-hairline">
              {user ? (
                <p
                  onClick={handleLogoutClick}
                  className="cursor-pointer bg-[#0083C7] text-white px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 text-[15px]"
                >
                  Logout
                </p>
              ) : (
                <Link to={"/login"}>
                  <p className="cursor-pointer bg-[#0083C7] text-white px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 text-[15px]">
                    Login
                  </p>
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#2F333A] shadow-2xl shadow-[#96a1eb] block lg:hidden fixed w-[100%] bottom-0 z-10">
        <div className="container mx-auto flex justify-evenly py-[10px] text-[#ffffff]">
          <div className="hover:text-[#0083C7] font-serif">
            <Link to={"/wishlist"}>
              <span className="text-[25px] grid place-items-center">
                <FaRegHeart />
              </span>
              <p>Wishlist</p>
            </Link>
          </div>

          <div className="hover:text-[#0083C7]">
            <Link to={"/"}>
              <span className="text-[25px] grid place-items-center">
                <AiOutlineHome />
              </span>
              <p>Home</p>
            </Link>
          </div>
          <div className="hover:text-[#0083C7] relative">
            <Link to={"/cart"}>
              <span className="text-[25px] grid place-items-center">
                <BsHandbag />
              </span>
              <p>Cart</p>
              <p className="absolute top-[-10px] right-[-10px] bg-[#0083C7] rounded-full w-[20px] h-[20px] text-[14px] text-center text-white">
                {count || 0}
              </p>
            </Link>
          </div>
          <div className="hover:text-[#0083C7]">
            <span className="text-[25px] grid place-items-center">
              <FaRegUser />
            </span>
            <p>Account</p>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-50 ${showModal ? "block" : "hidden"
          }`}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="bg-gray-300 text-gray-800 rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-10 inset-y-0 right-0 bg-gray-800 text-white w-64 p-4 transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform lg:hidden z-20 font-serif`}
      >
        <span
          className="grid place-items-end text-[25px] hover:text-[#0083C7]"
          onClick={() => setSidebarOpen(false)}
        >
          <RxCross2 />
        </span>
        <p className="py-2 px-4 hover:bg-gray-700 hover:text-[#0083C7] cursor-pointer">
          <Link to={"/"}>Home</Link>
        </p>
        <p className="py-2 px-4 hover:bg-gray-700 hover:text-[#0083C7] cursor-pointer">
          <Link to={"/about"}>About</Link>
        </p>
        <p className="py-2 px-4 hover:bg-gray-700 hover:text-[#0083C7] cursor-pointer">
          <Link to={"/Kitchenware"}>Kitchenware</Link>
        </p>
        <p className="py-2 px-4 hover:bg-gray-700 hover:text-[#0083C7] cursor-pointer">
          <Link to={"/HomeDecor"}>Home Decor</Link>
        </p>
        <p className="py-2 px-4 hover:bg-gray-700 hover:text-[#0083C7] cursor-pointer">
          <Link to={"/PersonalCare"}>Personal Care</Link>
        </p>
        <p className="py-2 px-4 hover:bg-gray-700 hover:text-[#0083C7] cursor-pointer">
          <Link to={"/contact"}>Contact</Link>
        </p>
      </div>
      
    </>
  );
}

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CommenSection from "../component/CommenSection";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5500/v1/user/forgotpass", { email });
            toast.success(data.message);
            console.log(data);
           

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <div className="container py-16 mx-auto">
                <CommenSection title="Forgot Password"> </CommenSection>
                <div className="w-full  max-w-md mx-auto shadow-md ">
                    <div className="px-4 py-8">
                        <form
                            action=""
                            className="flex flex-col gap-3"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="email">
                                Email<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="py-2 px-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                          
                            {/* <Link to={"/reset-password/:token"}> */}
                            <button type="submit" className="bg-orange-500 mt-5 text-white py-2 rounded hover:bg-orange-600 transition duration-300">Send Reset Link</button>
                            {/* </Link> */}
                            <div className="flex flex-col md:flex-row justify-between mt-5 gap-3">
                                <Link to={"/login"}>
                                    <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300">
                                        LOGIN
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

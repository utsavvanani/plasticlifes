import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import CommenSection from "../component/CommenSection";

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5500/v1/user/resetpass/${token}`, {
                newPassword,
            });
            setMessage(response.data.message);
            setError("");
            setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            setMessage("");
        }
    };

    return (
        <>


            <div className="container py-16 mx-auto">
                <CommenSection title="Reset Password"> </CommenSection>
                <div className="w-full  max-w-md mx-auto shadow-md ">
                    <div className="px-4 py-8">
                        <form
                            action=""
                            className="flex flex-col gap-3"
                            onSubmit={handleResetPassword}
                        >
                            <label htmlFor="email">
                                New Password:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                className="py-2 px-2 border rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />

                            <label htmlFor="email">
                                Confirm Password:<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                className="py-2 px-2 border rounded"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />                     
                            <button type="submit" className="bg-orange-500 mt-5 text-white py-2 rounded hover:bg-orange-600 transition duration-300">Reset Password</button>
                           
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ResetPassword;

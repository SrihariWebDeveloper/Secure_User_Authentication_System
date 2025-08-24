import React, { useContext } from "react";
import { assets } from "../../assets/images/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { userContext } from "../../Components/Context/Context.jsx";
import { useNavigate } from "react-router-dom";

//verifyEmail
const Verify = () => {
  const { getUserInfo } = useContext(userContext);
  const navigate = useNavigate();

  const inputRef = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePast = (e) => {
    const paste = e.clipboardData.getData("text");
    const pastArray = paste.split("");
    pastArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRef.current.map((e) => e.value);
      const otp = otpArray.join("");
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/verify-user-otp",
        { otp }
      );

      if (data.success) {
        navigate("/");
        getUserInfo();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-300">
      <img src={assets.logo} className="p-8" alt="" />
      <form
        onSubmit={verifyOtp}
        className="flex flex-col justify-center items-center mt-18 w-auto"
      >
        <div className="bg-slate-800 rounded-md shadow-2xl">
          <div className="mx-18 my-6 text-center">
            <h2 className="text-3xl font-bold text-white">
              Email Verification OTP
            </h2>
            <p className="text-slate-500">
              Enter the 6-digits code sent to your email id
            </p>
          </div>
          <div className="mx-12">
            <div className="flex flex-col gap-3 my-2">
              <div
                className="flex flex-row gap-3 justify-center text-center"
                onPaste={handlePast}
              >
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      type="text"
                      maxLength={1}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onInput={(e) => handleInput(e, index)}
                      required
                      ref={(e) => (inputRef.current[index] = e)}
                      className="w-8 border border-e-amber-50 p-2 rounded  text-white text-center"
                      key={index}
                    />
                  ))}
              </div>
              <div className="my-4 mx-14">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-blue-800 to-purple-700 text-white py-2 rounded-full items-center w-full font-medium cursor-pointer hover:bg-slate-100 transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Verify;

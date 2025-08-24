import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/images/assets.js";

const Forgot = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(0);

  const navigate = useNavigate();

  const [sentEmail, setSentEmail] = useState("");
  const [sentOtp, setSentOtp] = useState("");

  //otp sent
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

  //email varification
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/reset-verify",
        { email }
      );

      if (data.success) {
        toast.success(data.message);
        setSentEmail(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    //password
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setSentOtp(true);
  };

  const allSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/reset-otp",
        { email, otp, password }
      );

      if (data.success) {
        navigate("/login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* email */}
      {!sentEmail && (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-300">
          <img src={assets.logo} className="p-8" alt="" onClick={()=>navigate('/')} />
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col justify-center items-center mt-18 w-auto"
          >
            <div className="bg-slate-800 rounded-md shadow-2xl">
              <div className="mx-18 my-6 text-center">
                <h2 className="text-3xl font-bold text-white">
                  Enter Email Id
                </h2>
                <p className="text-slate-500">
                  Enter email id to reset your Password
                </p>
              </div>
              <div className="mx-12">
                <div className="flex flex-col gap-3 my-2">
                  <div className="flex flex-row gap-3 justify-center text-center">
                    {/* input */}

                    <img src={assets.mail_icon} alt="" />
                    <input
                      type="email"
                      name=""
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      id="email"
                      placeholder="Email Id"
                      required
                      className="outline-none bg-transparent  w-full text-white"
                    />
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
      )}
      {/* otp */}
      {!sentOtp && sentEmail && (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-300">
          <img src={assets.logo} className="p-8" alt="" onClick={()=>navigate('/')} />
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
      )}
      {/* password */}
      {sentOtp && sentEmail && (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-300">
          <img src={assets.logo} className="p-8" alt="" onClick={()=>navigate('/')} />
          <form
            onSubmit={allSubmitHandler}
            className="flex flex-col justify-center items-center mt-18 w-auto"
          >
            <div className="bg-slate-800 rounded-md shadow-2xl">
              <div className="mx-18 my-6 text-center">
                <h2 className="text-3xl font-bold text-white">New Password</h2>
                <p className="text-slate-500">Enter the new password below</p>
              </div>
              <div className="mx-12">
                <div className="flex flex-col gap-3 my-2">
                  <div className="flex flex-row gap-3 border border-slate-400  p-2 rounded-3xl pl-4">
                    <img src={assets.lock_icon} alt="" />
                    <input
                      type="password"
                      name=""
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      id="password"
                      placeholder="Password"
                      required
                      autoComplete="none"
                      className="outline-none h-auto bg-transparent w-full text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-br from-blue-800 to-purple-700 text-white px-4 py-2 rounded-full items-center w-full font-medium cursor-pointer hover:bg-slate-100 transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Forgot;

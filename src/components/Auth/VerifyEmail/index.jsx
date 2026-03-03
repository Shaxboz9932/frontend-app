import { useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../../service/useAuthStore";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const navigate = useNavigate()
  const email = useUserStore((state) => state.email)

  const handleVerifyEmail = async(e) => {
    e.preventDefault();
    // Bu yerda API orqali emailga parol tiklash havolasi yuborish logikasi qo'shiladi
    try {
      const response = await axios.post("https://django-backend-8bva.onrender.com/users/verify/email/", {
        email: email,
        code: code
      })
      if (response.status === 200) {
        toast.info(response.data.detail)
        navigate("/login")
        setEmail("")
      }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.detail)
    }
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="forgot-password-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center justify-center">
            <div className="lg:w-[572px] w-full min-h-[400px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Emailni tasdiqlash
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                  <p className="text-qgraytwo text-sm mt-2">
                    Emailga yuborilgan kodni kiriting
                  </p>
                </div>
                <form onSubmit={handleVerifyEmail} className="input-area">
                  <div className="input-item mb-7">
                    <InputCom
                      placeholder="6 xonali raqam"
                      label="Tasdiqlash Kodi*"
                      name="code"
                      type="number"
                      inputClasses="h-[50px]"
                      value={code}
                      inputHandler={setCode}
                    />
                  </div>
                  <div className="signin-area mb-3.5">
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                      >
                        <span>Tasdiqlash</span>
                      </button>
                    </div>
                  </div>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Hisobingizni esladingizmi?
                      <Link to="/login" className="ml-2 text-qblack">
                        Tizimga kirish
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

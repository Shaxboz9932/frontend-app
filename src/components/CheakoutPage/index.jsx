import { useEffect, useState } from "react";
import { useCartStore } from "../../service/useCart";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function CheakoutPage() {

  const accessToken = localStorage.getItem("accessToken")

  const cartItems = useCartStore((state) => state.cartItems)
  const showItems = useCartStore((state) => state.showItems)

  useEffect(() => {
    showItems(accessToken)
  }, [])

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)

  const validateForm = () => {
    if (!firstName.trim()) {
      toast.error("Ismingizni kiriting")
      return false
    }
    if (!lastName.trim()) {
      toast.error("Familiyangizni kiriting")
      return false
    }
    if (!email.trim()) {
      toast.error("Email kiriting")
      return false
    }
    if (!phone.trim()) {
      toast.error("Telefon raqam kiriting")
      return false
    }
    if (!address.trim()) {
      toast.error("Manzilni kiriting")
      return false
    }
    if (!city.trim()) {
      toast.error("Shaharni kiriting")
      return false
    }
    if (!postalCode.trim()) {
      toast.error("Pochta kodini kiriting")
      return false
    }
    return true
  }

  const handleCheckout = async (e) => {
    e.preventDefault()

    if (!validateForm()) return;

    try {
      setLoading(true)
      const response = await axios.post("https://django-backend-8bva.onrender.com/order/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        postal_code: postalCode
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      

    window.location.href = response.data.url;      
    toast.success("Tabriklaymiz! Buyrutmangiz qabul qilindi...")
    setLoading(false)
      // showItems(accessToken)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Checkout"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "checkout", path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5">
              <div className="sm:flex sm:space-x-[18px] s">
                <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Log into your Account
                      </span>
                    </div>
                  </a>
                </div>
                <div className="flex-1 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Enter Coupon Code
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Billing Details
                </h1>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0">
                        <InputCom
                          value={firstName}
                          inputHandler={setFirstName}
                          label="First Name*"
                          placeholder="Demo Name"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          value={lastName}
                          inputHandler={setLastName}
                          label="Last Name*"
                          placeholder="Demo Name"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <InputCom
                          value={email}
                          inputHandler={setEmail}
                          label="Email Address*"
                          placeholder="demoemial@gmail.com"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          value={phone}
                          inputHandler={setPhone}
                          label="Phone Number*"
                          placeholder="012 3  *******"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div>
                    <div className=" mb-6">
                      <div className="w-full">
                        <InputCom
                          value={address}
                          inputHandler={setAddress}
                          label="Address*"
                          placeholder="your address here"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div>
                    <div className=" mb-6">
                      <div className="w-full">
                        <InputCom
                          value={city}
                          inputHandler={setCity}
                          label="City*"
                          placeholder="your city here"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div>
                    <div className=" mb-6">
                      <div className="w-full">
                        <InputCom
                          value={postalCode}
                          inputHandler={setPostalCode}
                          label="Postal Code*"
                          placeholder="your postal code here"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center mb-10">
                      <div>
                        <input type="checkbox" name="" id="create" />
                      </div>
                      <label
                        htmlFor="create"
                        className="text-qblack text-[15px] select-none"
                      >
                        Create an account?
                      </label>
                    </div>
                    <div>
                      <h1 className="text-2xl text-qblack font-medium mb-3">
                        Billing Details
                      </h1>
                      <div className="flex space-x-2 items-center mb-10">
                        <div>
                          <input type="checkbox" name="" id="address" />
                        </div>
                        <label
                          htmlFor="address"
                          className="text-qblack text-[15px] select-none"
                        >
                          Ship to a different address
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        PROduct
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        total
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {cartItems && cartItems.map((item) => (
                        <li key={item.id}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-[15px] text-qblack mb-2.5">
                                {item.product.title}
                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{item.quantity}
                                </sup>
                              </h4>
                              <p className="text-[13px] text-qgray">

                              </p>
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                ${item.product.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        SUBTOTAL
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        ${totalPrice}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-[30px]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <div>
                          <span className="text-xs text-qgraytwo mb-3 block">
                            SHIPPING
                          </span>
                          <p className="text-base font-medium text-qblack">
                            Free Shipping
                          </p>
                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          +$0
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Total</p>
                      <p className="text-2xl font-medium text-qred">${totalPrice}</p>
                    </div>
                  </div>
                  <div className="shipping mt-[30px]">
                    <ul className="flex flex-col space-y-1">
                      <li className=" mb-5">
                        <div className="flex space-x-2.5 items-center mb-4">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="transfer"
                            />
                          </div>
                          <label
                            htmlFor="transfer"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Direct Bank Transfer
                          </label>
                        </div>
                        <p className="text-qgraytwo text-[15px] ml-6">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                        </p>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="delivery"
                            />
                          </div>
                          <label
                            htmlFor="delivery"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Cash on Delivery
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="bank"
                            />
                          </div>
                          <label
                            htmlFor="bank"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Credit/Debit Cards or Paypal
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <button onClick={handleCheckout} className="text-sm font-semibold">
                        {loading ? "Please wait..." : "Pay Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

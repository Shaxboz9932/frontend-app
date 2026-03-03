import { useCartStore } from "../../service/useCart";
import { useWishListStore } from "../../service/useWishList";
import InputQuantityCom from "../Helpers/InputQuantityCom";

export default function ProductsTable({ className, wishItems }) {

  const deleteItem = useWishListStore((state) => state.deleteItem)
  const addToCart = useCartStore((state) => state.addToCart)

  const accessToken = localStorage.getItem("accessToken")

  if (wishItems.length === 0) {
    return (
      <h2 className="text-[30px]">Sevimlilar ro'yxati bo'sh...</h2>
    )
  }

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                product
              </td>
              <td className="py-4 whitespace-nowrap text-center">color</td>
              <td className="py-4 whitespace-nowrap text-center">size</td>
              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap  text-center">quantity</td>
              <td className="py-4 whitespace-nowrap  text-center">add to cart</td>
              <td className="py-4 whitespace-nowrap text-center">delete</td>
            </tr>
            {/* table heading end */}
            {wishItems && wishItems.map((item) => (
              <tr className="bg-white border-b hover:bg-gray-50">
              <td className="pl-10  py-4 ">
                <div className="flex space-x-6 items-center">
                  <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                    <img
                      src={`https://django-backend-8bva.onrender.com${item.product.images[0].image}`}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <p className="font-medium text-[15px] text-qblack">
                      {item.product.title}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-center py-4 px-2">
                <div className=" flex justify-center items-center">
                  <span className="w-[20px] h-[20px] bg-[#E4BC87] block rounded-full"></span>
                </div>
              </td>
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">Small</span>
                </div>
              </td>
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">${item.product.price}</span>
                </div>
              </td>
              <td className=" py-4">
                <div className="flex justify-center items-center">
                  1
                </div>
              </td>
              <td className=" py-4">
                <div className="flex space-x-1 items-center justify-center">
                  <span onClick={() => addToCart(accessToken, item.product.id, 1)} className="text-[20px] font-normal cursor-pointer">+</span>
                </div>
              </td>
              <td className=" py-4">
                <div className="flex items-center justify-center">
                  <span onClick={() => deleteItem(accessToken, item.id)} className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                        fill="#AAAAAA"
                      />
                    </svg>
                  </span>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

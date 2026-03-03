import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrderTab() {

  const [orders, setOrders] = useState([])
  const [openOrderId, setOpenOrderId] = useState(null)
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://django-backend-8bva.onrender.com/order/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setOrders(response.data)
    }
    fetchData()
  }, [])

  console.log(orders)

  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Order
              </td>
              <td className="py-4 whitespace-nowrap text-center">Date</td>
              <td className="py-4 whitespace-nowrap text-center">Paid</td>
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              <td className="py-4 whitespace-nowrap  text-center">Action</td>
            </tr>
            {/* table heading end */}
            {orders && orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">#{order.id}</span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray  whitespace-nowrap">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    {order.paid ?
                      <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                        True
                      </span> :
                      <span className="text-sm rounded text-red-500 bg-red-100 p-2">
                        False
                      </span>}
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2 ">
                      ${order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <button
                      onClick={() => setOpenOrderId((prev) => prev === order.id ? null : order.id)}
                      type="button"
                      className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                    >
                      {openOrderId === order.id ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>

                {openOrderId === order.id && order.items && (
                  <tr className="bg-gray-50 border-b">
                    <td colSpan={5} className="px-4 py-4">
                      <div className="text-left">
                        <div className="mb-2 font-semibold text-qblack">
                          Order items
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          {order.items.map((item) => {
                            const firstImage = item.product?.images?.[0]?.image;

                            return (
                              <div
                                key={item.id}
                                className="flex items-start gap-3 rounded border border-gray-200 p-3 bg-white"
                              >
                                {firstImage && (
                                  <img
                                    src={`https://django-backend-8bva.onrender.com${firstImage}`}
                                    alt={item.product?.title}
                                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                                  />
                                )}

                                <div className="flex-1 flex items-start justify-between">
                                  <div>
                                    <div className="font-medium text-qblack">
                                      {item.product?.title}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                      Qty: {item.quantity}
                                    </div>
                                  </div>
                                  <div className="text-right text-sm text-qblack">
                                    <div>
                                      Price: {item.price.toLocaleString()}
                                    </div>
                                    <div className="font-semibold">
                                      Total:{" "}
                                      {(item.price * item.quantity).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

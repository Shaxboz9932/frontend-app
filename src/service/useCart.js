import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useCartStore = create((set) => ({
    cartItems: [],
    error: null,
    loading: false,
    info: null,

    showItems: async(accessToken) => {
        set({loading: true})

        try {
            const response = await axios.get("https://django-backend-8bva.onrender.com/cart/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            set({
                cartItems: response.data,
                error: null,
                loading: false
            })
        } catch (error) {
            set({
                error: error.message,
                cartItems: [],
                loading: false
            })
        }
    },

    deleteItem: async(accessToken, pk) => {
        set({loading: true})
        try {
            const response = await axios.delete(`https://django-backend-8bva.onrender.com/cart/${pk}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            set((state) => ({
                cartItems: state.cartItems.filter((item) => item.id !== pk),
                info: response.data.detail,
                loading: false,
                error: null,
            }))
            toast.warning("Savatdagi maxsulotni o'chirdingiz...")
        } catch (error) {
            set({
                error: error.message,
                cartItems: [],
                loading: false,
            })
        }
    },

    updateQuantity: async(accessToken, pk, qty) => {
        set({loading: true})

        try {
            await axios.patch(`https://django-backend-8bva.onrender.com/cart/update/${pk}/`, {
                quantity: qty
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            } 
            )

            set((state) => ({
                cartItems: state.cartItems.map((item) => 
                
                    item.id === pk
                    ? {...item, quantity: qty}
                    : item
                ),
                loading: false,
                error: null,
                info: "Savatni yangiladingiz"
            }))
            toast.success("Savatni yangiladingiz...")
        } catch (error) {
            set({
                loading: false,
                error: error.message,
            })
        }
    }, 

    addToCart: async(accessToken, product_id, quantity) => {
        set({loading: true})
        try {
            const response = await axios.post("https://django-backend-8bva.onrender.com/cart/", {
                product_id, 
                quantity
            }, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            set((state) => ({
                cartItems: [...state.cartItems, response.data],
                loading: false,
                error: null,
                info: "Savatga maxsulot qushildi..."
            }))
            console.log(response)
            toast.success("Savatga maxsulot qo'shildi...")
            
        } catch (error) {
            set({loading: false, error: error.message})
            toast.error(error.response.data.detail)
        }
    }
}))
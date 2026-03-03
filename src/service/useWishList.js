import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useWishListStore = create((set) => ({
    wishItems: [],
    error: null,
    loading: false,
    info: null,

    showItems: async(accessToken) => {
        set({loading: true})

        try {
            const response = await axios.get("https://django-backend-8bva.onrender.com/wishlist/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            set({
                wishItems: response.data,
                error: null,
                loading: false
            })
        } catch (error) {
            set({
                error: error.message,
                wishItems: [],
                loading: false
            })
        }
    },

    deleteItem: async(accessToken, pk) => {
        set({loading: true})
        try {
            const response = await axios.delete(`https://django-backend-8bva.onrender.com/wishlist/delete/${pk}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            set((state) => ({
                wishItems: state.wishItems.filter((item) => item.id !== pk),
                info: response.data.detail,
                loading: false,
                error: null,
            }))
            toast.warning("Sevimlilar ro'yxatidan maxsulotni o'chirdingiz...")
        } catch (error) {
            set({
                error: error.message,
                wishItems: [],
                loading: false,
            })
        }
    },

    addToWish: async(accessToken, product_id) => {
        set({loading: true})
        try {
            const response = await axios.post("https://django-backend-8bva.onrender.com/wishlist/", {
                product_id
            }, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            set((state) => ({
                wishItems: [...state.wishItems, response.data],
                loading: false,
                error: null,
                info: "Sevimlilar ro'yxatiga maxsulot qo'shildi..."
            }))
            console.log(response)
            toast.success("Sevimlilar ro'yxatiga maxsulot qo'shildi...")
            
        } catch (error) {
            set({loading: false, error: error.message})
            toast.error(error.response.data.detail)
        }
    }
}))
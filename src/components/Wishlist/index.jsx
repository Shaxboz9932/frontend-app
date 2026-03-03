import { useEffect } from "react";
import { useWishListStore } from "../../service/useWishList";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";

export default function Wishlist({ wishlist = true }) {

  const wishItems = useWishListStore((state) => state.wishItems)
  const showItems = useWishListStore((state) => state.showItems)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    showItems(token)
  }, [])

  return (
    <Layout childrenClasses={wishlist ? "pt-0 pb-0" : ""}>
      {wishlist === false ? (
        <div className="wishlist-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "wishlist", path: "/wishlist" },
              ]}
            />
            <EmptyWishlistError />
          </div>
        </div>
      ) : (
        <div className="wishlist-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Wishlist"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "wishlist", path: "/wishlist" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable wishItems={wishItems} className="mb-[30px]" />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

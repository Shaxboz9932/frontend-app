import { useEffect, useState } from "react";
import productDatas from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import axios from "axios";
import Pagination from "../Helpers/Pagination";
import { useSearchQuery } from "../../service/useSearch";
import { Helmet } from "react-helmet";

export default function AllProductPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });

  const [volume, setVolume] = useState({ min: 200, max: 500 });

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  const [products, setProducts] = useState([])
  const [pageNum, setPageNum] = useState(1)

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  const [initialBrand, setInitialBrand] = useState("")
  const [initialCategory, setInitialCategory] = useState("")

  const searchQuery = useSearchQuery((state) => state.searchQuery)

  useEffect(() => {
    const fetchBrands = async() => {
      const response = await axios.get("https://django-backend-8bva.onrender.com/products/get/brand/")
      try {
        setBrands(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBrands()
  }, [])


  useEffect(() => {
    const fetchBrands = async() => {
      const response = await axios.get("https://django-backend-8bva.onrender.com/products/get/category/")
      try {
        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(`https://django-backend-8bva.onrender.com/products/?page=${pageNum}&brand=${initialBrand}&category=${initialCategory}&search=${searchQuery}`)
      try {
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [pageNum, initialBrand, initialCategory, searchQuery])

  return (

    <>
    <Helmet>
      <meta name="description" content="All Notebok Products"/>
      <meta property="og:title" content="All Products"/>
      <meta property="og:description" content="Barcha maxsulotlar"/>
      <meta property="og:image" content="/image.png"/>
      <title>All Products </title>
    </Helmet>

      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  setInitialCategory={setInitialCategory}
                  setPageNum={setPageNum}
                  setInitialBrand={setInitialBrand}
                  brands={brands}
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                  categories={categories}
                />
                {/* ads */}
                {/* <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`${
                      import.meta.env.VITE_PUBLIC_URL
                    }/assets/images/bannera-5.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div> */}
              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> {products.start_index} – {products.end_index} of {products.count} 
                       results
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sort by:</span>
                    <div className="flex space-x-3 items-center border-b border-b-qgray">
                      <span className="font-400 text-[13px] text-qgray">
                        Default
                      </span>
                      <span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  
                    {products?.results?.map((product) => {
                      return (
                        <div data-aos="fade-up" key={product.id}>
                          <ProductCardStyleOne datas={product} />
                        </div>
                      )
                    })}
                  
                </div>

                
                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={products}
                    startLength={6}
                    endLength={15}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div> */}
              </div>
            </div>
          </div>
          <Pagination products={products} setPageNum={setPageNum}/>
        </div>
      </Layout>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import Picture from "../picture/Picture";
import SocialMediaShare from "../common/SocialMediaShare";
import { useProduct } from "../lib/woocommerce";
import RelatedProductsSection from "./RelatedProductsSection";
import { Skeleton } from "@nextui-org/react";
import { useAppSelector } from "../hooks";

interface ProductDisplaySectionProps {
  FormatedId?: string;
}

const ProductDisplaySection = ({ FormatedId }: ProductDisplaySectionProps) => {
  const {
    data: product,
    isLoading: productWpIsLoading,
    isError: productIsError,
  } = useProduct(FormatedId);

  const Product: ProductType = product;
  const { baseCurrency, exchangeRate } = useAppSelector(
    (state) => state.currency
  );
  const pathname = usePathname();
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [baseUrl, setBaseUrl] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  const { addItem, removeItem, updateItem, getItem } = useCart();

  let Idn = "0";
  let Price = 0;

  if (Product) {
    Idn = Product?.id.toString();
    Price = parseInt(Product?.price);
  }

  const cartItem = getItem(Idn);
  const cartItemCount = cartItem ? cartItem.quantity : 0;

  const handleMinusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = Math.max(count - 1, 0);
    if (newCount === 0) {
      removeItem(Idn);
    } else {
      updateItem(Idn, { quantity: newCount });
    }
    setCount(newCount);
  };

  const handlePlusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = count + 1;
    addItem({
      id: Idn,
      name: Product?.name,
      price: Price,
      quantity: newCount,
      image: Product?.images[0]?.src,
    });
    setCount(newCount);
  };

  const handleClick = (e: React.MouseEvent) => {
    router.push("/cart");
  };

  const [rate, setRate] = useState(1);

  return (
    <>
      <section className="px-2 sm:px-4 md:px-5 lg:px-8 xl:px-0 mt-3 overflow-hidden">
        {Product && (
          <>
            <div className="bg-white flex flex-col lg:flex-row w-full py-4 sm:py-5 lg:py-8 gap-6 sm:gap-8 px-3 ">
              {/* Product Image */}
              <div className="flex items-center justify-center w-full lg:w-1/2">
                <Picture
                  src={Product?.images[0]?.src || ""}
                  alt={Product?.name}
                  className="w-full max-w-[500px] p-2 sm:p-4 object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col w-full lg:w-1/2 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2 sm:gap-4">
                    <h4
                      title={Product?.name}
                      className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
                      {Product?.name}
                    </h4>
                    <div className="flex items-center">
                      <button
                        className={`${
                          Product?.stock_status === "instock"
                            ? "bg-green-500"
                            : Product?.stock_status === "outofstock"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        } text-white px-3 py-1 text-xs sm:text-sm rounded-full`}>
                        {Product?.stock_status === "instock"
                          ? "In Stock"
                          : Product?.stock_status === "outofstock"
                          ? "Out of Stock"
                          : Product?.stock_status === "onbackorder"
                          ? "On Back Order"
                          : ""}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex flex-col gap-4 mt-4 sm:mt-6 md:mt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 border-b border-gray-200">
                    <h5 className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-0">
                      Price:
                    </h5>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-primary">
                        <FormatMoney2 value={Price} />
                      </h3>
                      {Product?.regular_price && (
                        <h4 className="text-sm sm:text-base text-gray-400 line-through">
                          <FormatMoney2
                            value={parseInt(Product?.regular_price)}
                          />
                        </h4>
                      )}
                    </div>
                  </div>

                  {/* Quantity Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 border-b border-gray-200">
                    <h5 className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-0">
                      Quantity:
                    </h5>
                    <div className="flex items-center">
                      <button
                        onClick={handleMinusCartClick}
                        className="py-2 px-3 sm:px-4 border border-gray-300 rounded-l-lg hover:bg-gray-100 transition">
                        <AiOutlineMinus className="text-sm sm:text-base" />
                      </button>
                      <span className="py-2 px-4 border-t border-b border-gray-300 text-center w-12 sm:w-16">
                        {cartItemCount}
                      </span>
                      <button
                        onClick={handlePlusCartClick}
                        className="py-2 px-3 sm:px-4 border border-gray-300 rounded-r-lg hover:bg-gray-100 transition">
                        <AiOutlinePlus className="text-sm sm:text-base" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                    {cartItemCount > 0 && (
                      <button
                        onClick={handleClick}
                        className="bg-primary hover:bg-primary-dark px-6 sm:px-8 py-3 rounded-lg text-white font-medium text-sm sm:text-base transition w-full sm:w-auto">
                        Buy Now
                      </button>
                    )}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <span className="text-xs sm:text-sm text-gray-500">
                        Share:
                      </span>
                      <SocialMediaShare
                        APP_ID={""}
                        mediaDescription={Product?.name}
                        picture_url={Product?.images[0]?.src}
                        shareUrl={`${baseUrl}${pathname}`}
                        title={Product?.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white mt-4 sm:mt-6 w-full px-3 sm:px-4 md:px-6">
              <div className="pb-3 pt-4 sm:pt-6 border-b-2 border-primary w-full sm:w-auto">
                <h4 className="text-sm sm:text-base font-semibold text-gray-700 uppercase">
                  Description
                </h4>
              </div>
              <div className="py-4 sm:py-6">
                <div
                  dangerouslySetInnerHTML={{ __html: Product?.description }}
                  className="prose prose-sm sm:prose max-w-none text-gray-700"
                />
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-6 sm:mt-8  sm:px-0">
              <RelatedProductsSection
                productCategoryId={Product?.categories[0]?.id.toString()}
              />
            </div>
          </>
        )}

        {productWpIsLoading && (
          <div className="space-y-4 sm:space-y-6">
            <Skeleton className="h-60 sm:h-80 bg-gray-200 w-full rounded-lg" />
            <Skeleton className="h-40 sm:h-48 bg-gray-200 w-full rounded-lg" />
            <Skeleton className="h-64 sm:h-80 bg-gray-200 w-full rounded-lg" />
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDisplaySection;

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { RiShoppingBagFill } from "react-icons/ri";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  boxShadow?: boolean;
}

const ProductCard2 = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  boxShadow,
}: ProductCard2Props) => {
  const router = useRouter();
  const { addItem, removeItem, updateItem, getItem } = useCart();
  const [count, setCount] = useState(0);
  const ID = id.toString();
  const cartItem = getItem(ID);
  const cartItemCount = cartItem ? cartItem.quantity : 0;
  const NewAmount = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(count + 1);
    addItem({
      id: ID,
      name: description,
      price: NewAmount,
      quantity: count,
      image: image,
    });
  };

  const handleMinusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = Math.max(count - 1, 0);
    if (newCount === 0) {
      removeItem(ID);
    } else {
      updateItem(ID, { quantity: newCount });
    }
    setCount(newCount);
  };

  const handlePlusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = count + 1;
    addItem({
      id: ID,
      name: description,
      price: NewAmount,
      quantity: newCount,
      image: image,
    });
    setCount(newCount);
  };

  return (
    <div
      className={`flex flex-col bg-gray1-300 gap-2 justify-between w-full h-full max-w-[200px] sm:max-w-[250px] cursor-pointer rounded-sm ${
        boxShadow ? "shadow-lg bg-white" : "border-[1px] border-[#bfbfbf4f]"
      } hover:shadow-lg transition-all duration-300`}>
      {/* Image Container */}
      <div className="relative w-full pt-[100%] overflow-hidden rounded-t-sm">
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="absolute inset-0">
          <Picture
            src={image || ""}
            alt={`${description}-image`}
            className="w-full h-full object-contain object-center"
            loading="eager"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-1 gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm text-primary font-medium">
            {NewAmount ? <FormatMoney2 value={NewAmount} /> : "Out of Stock"}
          </h4>
          <div
            className={`flex items-center gap-1 rounded-md text-white p-1 text-xs sm:text-sm transition ${
              cartItemCount !== 0 ? "bg-primary" : ""
            }`}>
            {cartItemCount === 0 ? (
              <RiShoppingBagFill
                className="fill-primary text-xl sm:text-2xl"
                onClick={handleCartClick}
              />
            ) : (
              <>
                <AiOutlineMinus
                  onClick={handleMinusCartClick}
                  className="text-xs sm:text-sm"
                />
                <span>{cartItemCount}</span>
                <AiOutlinePlus
                  onClick={handlePlusCartClick}
                  className="text-xs sm:text-sm"
                />
              </>
            )}
          </div>
        </div>

        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          dangerouslySetInnerHTML={{ __html: description }}
          className="line-clamp-2 text-xs sm:text-sm text-text_color font-semibold leading-snug"
        />
      </div>
    </div>
  );
};

export default ProductCard2;

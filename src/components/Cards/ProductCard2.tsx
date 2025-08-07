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
  boxShadow = true,
}: ProductCard2Props) => {
  const router = useRouter();
  const { addItem, removeItem, updateItem, getItem } = useCart();
  const [count, setCount] = useState(0);
  const ID = id.toString();
  const cartItem = getItem(ID);
  const cartItemCount = cartItem ? cartItem.quantity : 0;
  const parsedNewAmount = parseFloat(newAmount) || 0;
  const slugDesc = convertToSlug(description);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = count + 1;
    setCount(newCount);
    addItem({
      id: ID,
      name: description,
      price: parsedNewAmount,
      quantity: newCount,
      image,
    });
  };

  const handleMinusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    if (newCount === 0) {
      removeItem(ID);
    } else {
      updateItem(ID, { quantity: newCount });
    }
  };

  const handlePlusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = count + 1;
    setCount(newCount);
    addItem({
      id: ID,
      name: description,
      price: parsedNewAmount,
      quantity: newCount,
      image,
    });
  };

  return (
    <div
      className={`flex flex-col bg-white gap-4 justify-between min-w-[180px] max-w-[200px] sm:min-w-[240px] sm:max-w-[260px] min-h-[340px] sm:min-h-[400px] rounded-xl overflow-hidden transition-all duration-500 ${
        boxShadow ? "shadow-lg hover:shadow-2xl" : "border border-gray-200"
      } hover:-translate-y-2 focus-within:ring-4 focus-within:ring-primary/20`}
      role="region"
      aria-label={`Product card for ${description}`}>
      {/* Image Container */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative w-full pt-[100%] bg-gray-50"
        aria-label={`View details for ${description}`}>
        <Picture
          src={image || "/placeholder-image.jpg"}
          alt={`${description}`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          loading="eager"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col px-4 pb-4 gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col">
            <h4 className="text-base sm:text-lg font-bold text-primary">
              {parsedNewAmount ? (
                <FormatMoney2 value={parsedNewAmount} />
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </h4>
            {oldAmount && parsedNewAmount < parseFloat(oldAmount) && (
              <span className="line-through text-sm text-gray-400">
                <FormatMoney2 value={parseFloat(oldAmount)} />
              </span>
            )}
          </div>
          <div
            className={`flex items-center justify-center gap-3 rounded-full px-3 py-2 transition-colors ${
              cartItemCount > 0 ? "bg-primary text-white" : "bg-gray-100"
            } hover:bg-primary/90 w-full sm:w-auto`}
            role="button"
            aria-label={cartItemCount > 0 ? "Adjust quantity" : "Add to cart"}>
            {cartItemCount === 0 ? (
              <RiShoppingBagFill
                className="text-2xl text-primary"
                onClick={handleCartClick}
                aria-label="Add to cart"
              />
            ) : (
              <>
                <button
                  onClick={handleMinusCartClick}
                  className="text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="Decrease quantity">
                  <AiOutlineMinus />
                </button>
                <span className="text-base font-semibold">{cartItemCount}</span>
                <button
                  onClick={handlePlusCartClick}
                  className="text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="Increase quantity">
                  <AiOutlinePlus />
                </button>
              </>
            )}
          </div>
        </div>

        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="text-base text-gray-800 font-semibold line-clamp-2 hover:text-primary transition-colors duration-300"
          dangerouslySetInnerHTML={{ __html: description }}
          aria-label={`View details for ${description}`}
        />
      </div>
    </div>
  );
};

export default ProductCard2;

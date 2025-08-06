"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";

const ProductPageBottomHeader = () => {
  const pathname = usePathname();
  function extractAndCapitalize(path: string) {
    const match = pathname.match(/\/[^/]+\/([^/]+)-/);
    if (match && match[1]) {
      const extractedText = match[1].replace(/-/g, " ");
      return extractedText.charAt(0).toUpperCase() + extractedText.slice(1);
    }
    return null;
  }

  const capitalizeFirstLetter = (word: string | null) => {
    if (word) {
      // Decode the URL-encoded characters
      const decodedWord = decodeURIComponent(word);

      // Capitalize the first letter and convert the rest to lowercase
      return decodedWord.charAt(0) + decodedWord.slice(1);
    }
    return "";
  };

  const formattedLastWord = extractAndCapitalize(pathname);
  const extractedText = capitalizeFirstLetter(formattedLastWord);

  return (
    <nav className="hidden slg:flex gap-24 justify-center items-center w-full py-4 bg-primaryColor-100 px-32">
      <div className="flex w-full max-w-[1156px] gap-2 text-sm capitalize leading-[1.4] px-36">
        <Link
          href="/"
          className="text-white font-[400] hover:text-primaryColor-200 transition">
          Home
        </Link>
        <span className="text-white">/</span>
        <h4 className="text-white font-[400]">Product</h4>
        <span className="text-white">/</span>
        <h4 className="truncate font-semibold text-white/50 w-[30rem]">
          {extractedText}
        </h4>
      </div>
    </nav>
  );
};

export default ProductPageBottomHeader;

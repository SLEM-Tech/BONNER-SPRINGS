"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";

interface HomeCardProps {
  id: string;
  image: string | undefined;
  name: string;
}

const HomeCard = ({ id, image, name }: HomeCardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCategoryClick = (name: string, id: number) => {
    const categorySlugId = `${convertToSlug(name)}-${id}`;
    dispatch(updateCategorySlugId({ categorySlugId }));
    router.push(`/category/${categorySlugId}`);
  };

  return (
    <Link
      href={`/category/${convertToSlug(name)}-${id}`}
      onClick={(e) => {
        e.preventDefault();
        handleCategoryClick(name, Number(id));
      }}
      className="group flex flex-col items-center gap-3 w-full max-w-[180px] sm:max-w-[200px] transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none"
      aria-label={`Browse ${name} category`}>
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <Picture
          src={image || "/images/home-img-2.png"}
          alt={`${name} category`}
          className="w-full h-full object-contain p-4"
          loading="lazy"
          width={160}
          height={160}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:to-black/20 transition-all duration-300" />
      </div>

      {/* Category Name */}
      <h3 className="text-sm sm:text-base font-medium text-gray-800 text-center px-2 line-clamp-2">
        {name}
      </h3>
    </Link>
  );
};

export default HomeCard;

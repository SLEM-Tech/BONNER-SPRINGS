"use client";
import React, { useEffect, useRef, useState } from "react";
import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import HomeCard from "../Cards/HomeCard";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import {
  heroImage,
  homepageBg,
  herosectionImg,
  service1,
} from "@public/images";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: string | undefined;
  }>({});

  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);
        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`
              );
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;
              return {
                categoryId: category?.id,
                firstProductImage,
              };
            }
          );

          const productsResults = await Promise.all(productsPromises);
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {}
          );
          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleCategoryClick = (category: CategoryType) => {
    const categorySlugId = `${convertToSlug(category.name)}-${category.id}`;
    dispatch(updateCategorySlugId({ categorySlugId }));
    router.push(`/category/${categorySlugId}`);
  };

  return (
    <main className="relative bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="relative flex items-center justify-center min-h-screen text-white pt-20 md:pt-32 pb-10">
          <Picture
            src={homepageBg}
            alt="hero-image"
            className="h-full w-full absolute object-cover top-0 left-0"
          />

          <div className="container mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center h-full z-10">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
                Build Your Library with
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                Books You&apos;ll Love.
              </h2>
              <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white font-light">
                From new releases to hidden gems,{" "}
                <br className="hidden sm:block" />
                curated just for you
              </p>
            </div>

            <div className="relative left-5 md:left-0 w-[200px] h-[300px] sm:w-[300px] sm:h-[450px] md:w-[350px] md:h-[500px] mt-8 md:mt-0">
              <Picture
                src={herosectionImg}
                alt="software-box-back"
                className="absolute -top-5 left-[30px] sm:left-[50px] w-full h-full shadow-2xl z-0"
              />
              <Picture
                src={herosectionImg}
                alt="software-box-front"
                className="absolute top-[30px] -left-20 sm:-left-32 w-full h-full shadow-2xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured Category Banner */}
          {categoryWpIsLoading ? (
            <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 rounded-xl animate-pulse mb-6 md:mb-8" />
          ) : (
            categories?.[0] && (
              <div className="group relative overflow-hidden rounded-xl mb-6 md:mb-8 h-48 sm:h-64 md:h-80">
                <Link
                  href={`/category/${convertToSlug(categories[0].name)}-${
                    categories[0].id
                  }`}
                  onClick={() => handleCategoryClick(categories[0])}>
                  <Picture
                    src={categories[0]?.image?.src || service1}
                    alt={categories[0]?.image?.alt || "Featured category"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {categories[0].name}
                    </h2>
                  </div>
                </Link>
              </div>
            )
          )}

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {categoryWpIsLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-40 sm:h-48 md:h-56 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))
              : categories?.slice(1, 5).map((category: any) => (
                  <div
                    key={category.id}
                    className="group relative overflow-hidden rounded-lg h-40 sm:h-48 md:h-56">
                    <Link
                      href={`/category/${convertToSlug(category.name)}-${
                        category.id
                      }`}
                      onClick={() => handleCategoryClick(category)}>
                      <Picture
                        src={
                          category?.image?.src ||
                          categoryProductsMap[category.id] ||
                          heroImage
                        }
                        alt={category?.image?.alt || category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-4 transition-opacity duration-300 group-hover:bg-black/40">
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>

          {/* Categories Carousel */}
          <div className="mt-10 md:mt-14">
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              Browse All Categories
            </h3>
            {categoryWpIsLoading ? (
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-40 h-48 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar">
                {categories?.map((category: any) => {
                  const productImage = categoryProductsMap[category.id];
                  if (!productImage) return null;

                  return (
                    <div
                      key={category.id}
                      className="flex-shrink-0 w-40 sm:w-48 md:w-56 snap-start">
                      <HomeCard
                        id={category.id.toString()}
                        image={productImage}
                        name={category.name}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primaryColor-100 py-6 md:py-8">
        <div className="mx-auto container px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium">
              Explore more packages
            </h1>
            <p className="text-sm md:text-base font-light">
              Your online destination for books across all genres.
            </p>
          </div>
          <Link
            href="/category"
            className="bg-btnColor-100 py-2 px-6 rounded-full text-white whitespace-nowrap">
            Shop now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AllCategorySection;

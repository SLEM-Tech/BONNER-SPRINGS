"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import {
  heroImage,
  herosectionImg,
  homepageBg,
  service1,
  service2,
  service3,
  service4,
} from "@public/images";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

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

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0
                  ? response?.data[0]?.images[0]?.src
                  : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            }
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
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

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    }
  };

  // const handleCategoryClick = (index: number) => {
  // 	const categorySlugId = `${
  // 		convertToSlug(Categories[index]?.name) + "-" + Categories[index]?.id
  // 	}`;
  // 	dispatch(updateCategorySlugId({ categorySlugId }));
  // 	router.push(
  // 		`/category/${
  // 			convertToSlug(Categories[index]?.name) + "-" + Categories[index]?.id
  // 		}`,
  // 	);
  // };

  const services = [service1, service2, service3, service4];

  return (
    <main className="relative bg-white">
      <>
        {/* Hero Section */}
        <section className="relative h-full w-full overflow-hidden">
          <div className="relative flex items-center justify-center min-h-screen text-white pt-20 md:pt-32 pb-10">
            <Picture
              src={homepageBg}
              alt="hero-image"
              className="h-full w-full absolute object-cover top-0 left-0"
            />

            <div className="container mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center h-full z-10">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-white">
                  Power Up with the
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold">
                  Right Software.
                </h2>
                <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white font-light">
                  From creative tools to business essentials,{" "}
                  <br className="hidden sm:block" />
                  we&apos;ve got what you need
                </p>
              </div>

              {/* Image boxes - hidden on very small screens, adjusted positioning */}
              <div className="relative left-5 md:left-0 w-[250px] h-[350px] sm:w-[300px] sm:h-[450px] md:w-[350px] md:h-[500px] mt-8 md:mt-0 ">
                {/* Back Box */}
                <Picture
                  src={herosectionImg}
                  alt="software-box-back"
                  className="absolute -top-5 left-[30px] sm:left-[50px] w-full h-full shadow-2xl z-0"
                />

                {/* Front Box */}
                <Picture
                  src={herosectionImg}
                  alt="software-box-front"
                  className="absolute top-[30px] -left-20 sm:-left-32 w-full h-full shadow-2xl z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="flex w-full bg-white py-8 px-4 sm:px-6 md:px-8 pb-12 slg:pb-0 slg:mb-20">
          <div className="container mx-auto px-2 sm:px-4">
            <div>
              <h1 className="text-2xl md:text-3xl">Services</h1>
              <hr className="w-full mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {/* Service 1 */}
              <div className="sm:row-span-1 h-[300px] sm:h-auto">
                <Picture
                  src={services[0]}
                  alt="Service 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Services 2 & 3 */}
              <div className="grid grid-rows-2 gap-4">
                <div className="h-[300px] sm:h-auto">
                  <Picture
                    src={services[1]}
                    alt="Service 2"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="h-[300px] sm:h-auto">
                  <Picture
                    src={services[2]}
                    alt="Service 3"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Service 4 */}
              <div className="sm:row-span-2 h-[300px] sm:h-auto">
                <Picture
                  src={services[3]}
                  alt="Service 4"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
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
                Lorem ipsum dolor sit amet consectetur. Ullamcorper vitae
                semper.
              </p>
            </div>
            <button className="bg-btnColor-100 py-2 px-6 rounded-full text-white whitespace-nowrap">
              enrol now
            </button>
          </div>
        </section>
      </>
    </main>
  );

  // return (
  // 	<>
  // 		{categoryWpIsLoading && (
  // 			<section className='mb-8'>
  // 				<div className='w-full h-[100px] sm:h-[270px] bg-gray-200 rounded-md animate-pulse' />

  // 				<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 overflow-x-auto hide-scrollbar mt-4 md:mt-6 lg:mt-8 pb-4'>
  // 					<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 					<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 					<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 					<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 				</div>
  // 			</section>
  // 		)}

  // 		{Categories && (
  // 			<>
  // 				<section className='mb-2 md:mb-8'>
  // 					{categoryWpIsLoading ? (
  // 						<div className='w-full h-[100px] sm:h-[270px] bg-gray-200 rounded-md animate-pulse'></div>
  // 					) : (
  // 						// <Link
  // 						// 	href={`${
  // 						// 		"/category/" +
  // 						// 		convertToSlug(Categories[0]?.name) +
  // 						// 		"-" +
  // 						// 		Categories[0]?.id
  // 						// 	}`}
  // 						// 	className='mt-10'
  // 						// >
  // 						<Picture
  // 							// src={Categories[0]?.image?.src}
  // 							src={heroImage}
  // 							alt={"hero-image"}
  // 							className='w-full object-fill h-fit sm:h-[270px] bg-primaryColor-300/40'
  // 						/>
  // 						// </Link>
  // 					)}

  // 					<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 overflow-x-auto hide-scrollbar mt-4 md:mt-6 lg:mt-8'>
  // 						{categoryWpIsLoading ? (
  // 							// Loading state for the smaller images in the grid
  // 							<>
  // 								<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 								<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 								<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 								<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
  // 							</>
  // 						) : (
  // 							<>
  // 								{Categories[0] && Categories[0]?.image?.src && (
  // 									<Link
  // 										href={`${
  // 											"/category/" +
  // 											convertToSlug(Categories[0]?.name) +
  // 											"-" +
  // 											Categories[0]?.id
  // 										}`}
  // 									>
  // 										<Picture
  // 											src={Categories[0]?.image?.src}
  // 											alt={Categories[0]?.image?.alt}
  // 											className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
  // 										/>
  // 									</Link>
  // 								)}
  // 								{Categories[1] && Categories[1]?.image?.src && (
  // 									<Link
  // 										href={`${
  // 											"/category/" +
  // 											convertToSlug(Categories[1]?.name) +
  // 											"-" +
  // 											Categories[1]?.id
  // 										}`}
  // 									>
  // 										<Picture
  // 											src={Categories[1]?.image?.src}
  // 											alt={Categories[1]?.image?.alt}
  // 											className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
  // 										/>
  // 									</Link>
  // 								)}
  // 								{Categories[2] && Categories[2]?.image?.src && (
  // 									<Link
  // 										href={`${
  // 											"/category/" +
  // 											convertToSlug(Categories[2]?.name) +
  // 											"-" +
  // 											Categories[2]?.id
  // 										}`}
  // 									>
  // 										<Picture
  // 											src={Categories[2]?.image?.src}
  // 											alt={Categories[2]?.image?.alt}
  // 											className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
  // 										/>
  // 									</Link>
  // 								)}
  // 								{Categories[3] && Categories[3]?.image?.src && (
  // 									<Link
  // 										href={`${
  // 											"/category/" +
  // 											convertToSlug(Categories[3]?.name) +
  // 											"-" +
  // 											Categories[3]?.id
  // 										}`}
  // 									>
  // 										<Picture
  // 											src={Categories[3]?.image?.src}
  // 											alt={Categories[3]?.image?.alt}
  // 											className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
  // 										/>
  // 									</Link>
  // 								)}
  // 							</>
  // 						)}
  // 					</div>
  // 				</section>

  // 				<div
  // 					className='flex w-full gap-3 sm:gap-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar'
  // 					ref={sliderRef}
  // 				>
  // 					{Categories?.map((category: CategoryType) => {
  // 						const productImage: any = categoryProductsMap[category?.id]; // Fetch the first product image

  // 						// Only show categories that have a product image
  // 						if (productImage) {
  // 							return (
  // 								<>
  // 									<HomeCard
  // 										key={category?.id}
  // 										id={category?.id.toString()}
  // 										image={productImage} // Use the first product image
  // 										name={category?.name}
  // 									/>
  // 								</>
  // 							);
  // 						}

  // 						return null;
  // 					})}
  // 				</div>
  // 				{/* </Carousel> */}
  // 			</>
  // 		)}
  // 	</>
  // );
};

export default AllCategorySection;

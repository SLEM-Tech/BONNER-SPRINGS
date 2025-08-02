"use client";
import { homepageBg } from "@public/images";
import AppLayout from "@src/components/AppLayout";
import MainCategoryContent from "@src/components/PageFragments/MainCategoryContent";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import PriceRangeSection from "@src/components/PageFragments/PriceRangeSection";
import SearchNSortSection from "@src/components/PageFragments/SearchNSortSection";
import Picture from "@src/components/picture/Picture";
import React from "react";

const page = () => {
  return (
    <AppLayout>
      <div className="flex flex-col slg:flex-row gap-4 w-full pt-40 slg:pt-44 px-2 sm:px-6 mx-auto z-20">
        <MainCategoryContent />
      </div>
    </AppLayout>
  );
};

export default page;

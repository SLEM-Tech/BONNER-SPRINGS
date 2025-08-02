import React from "react";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import Picture from "@src/components/picture/Picture";
import { homepageBg } from "@public/images";

const { description, title } = SEODATA.user_dashboard;
export const metadata: Metadata = {
  title: title,
  description: description,
  icons: SEODATA.defaultOGImage,
  openGraph: {
    images: [
      {
        url: SEODATA.defaultOGImage,
      },
    ],
  },
};

const page = () => {
  return (
    <AppLayout>
      <div className="relative flex items-center justify-center h-full w-full  ">
        <Picture
          src={homepageBg}
          alt="hero-image"
          className="h-full md:w-full absolute object-cover w-screen top-0"
        />
        <div className="px-2 sm:px-6  w-screen z-20">
          <Dashboard />
        </div>
      </div>
    </AppLayout>
  );
};

export default page;

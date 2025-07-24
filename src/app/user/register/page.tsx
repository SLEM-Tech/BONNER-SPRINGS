import { SEODATA } from "@constants/seoContants";
import { homepageBg } from "@public/images";
import AppLayout from "@src/components/AppLayout";
import RegisterForm from "@src/components/Form/RegisterForm";
import Picture from "@src/components/picture/Picture";
import { Metadata } from "next";
import React from "react";

const { description, title } = SEODATA.register;
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
      <div className="relative flex items-center justify-center h-screen ">
        <Picture
          src={homepageBg}
          alt="hero-image"
          className="h-full md:w-full absolute object-cover w-screen top-0"
        />
        {/* Optional: overlay */}

        <RegisterForm />
      </div>
    </AppLayout>
  );
};

export default page;

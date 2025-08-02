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
      <div className="pt-24 md:py-32 mb-20 flex items-center justify-center px-3 md:px-0">
        <RegisterForm />
      </div>
    </AppLayout>
  );
};

export default page;

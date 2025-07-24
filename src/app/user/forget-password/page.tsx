import { SEODATA } from "@constants/seoContants";
import { homepageBg } from "@public/images";
import AppLayout from "@src/components/AppLayout";
import ForgotPasswordForm from "@src/components/Form/ForgotPasswordForm";
import LoginForm from "@src/components/Form/LoginForm";
import Picture from "@src/components/picture/Picture";
import { Metadata } from "next";
import React from "react";

const { description, title } = SEODATA.forgot_password;
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
      <div className="relative flex items-center  justify-center h-screen ">
        <Picture
          src={homepageBg}
          alt="hero-image"
          className="h-full md:w-full absolute object-cover w-screen top-0"
        />
        {/* Optional: overlay */}
        <main className="mt-40 md:my-48 mb-20 flex items-center justify-center px-3 md:px-0 z-20">
          <ForgotPasswordForm />
        </main>
      </div>
    </AppLayout>
  );
};

export default page;

import AppLayout from "@src/components/AppLayout";
import React from "react";
import CheckoutInfoForm from "./component/CheckoutInfoForm";
import Picture from "@src/components/picture/Picture";
import { homepageBg } from "@public/images";

const Page = () => {
  return (
    <AppLayout>
      <div className="relative flex items-center justify-center h-full w-full ">
        <Picture
          src={homepageBg}
          alt="hero-image"
          className="h-full md:w-full absolute object-cover w-screen top-0"
        />

        <div className="px-2 sm:px-6 mt-40 slg:mt-40 w-screen z-20 ">
          <section className=" mx-auto mt-3 w-full  rounded-md max-w-[1440px]">
            <h4 className="text-white text-center sm:text-start capitalize text-base sm:text-2xl font-[500] leading-[1.5] py-2 sm:py-3 ">
              Checkout
            </h4>
          </section>
          <CheckoutInfoForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;

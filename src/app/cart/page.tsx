import AppLayout from "@src/components/AppLayout";
import ShoopingCartReview from "@src/components/PageFragments/ShoopingCartReview";
import DiscountCode from "./_components/DiscountCode";
import Picture from "@src/components/picture/Picture";
import { homepageBg } from "@public/images";

const Page = () => {
  return (
    <AppLayout>
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <Picture
          src={homepageBg}
          alt="hero-image"
          className="h-full md:w-full absolute object-cover w-screen top-0"
        />

        <main className="flex flex-col xl:flex-row gap-4 w-full px-3 xl:px-6 max-w-[1440px] mx-auto mt-40 slg:mt-40 mb-16 md:mb-64 z-20">
          <div className="flex-1">
            <ShoopingCartReview />
          </div>
          <div className="flex-[.5]">
            <DiscountCode />
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default Page;

import { homepageBg } from "@public/images";
import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";
import FaqAccordion from "@src/components/Reusables/Accordion/FaqAccordion";

const page = () => {
  return (
    <AppLayout>
      <div className="relative flex items-center justify-center h-full ">
        <Picture
          src={homepageBg}
          alt="hero-image"
          className="h-full md:w-full absolute object-cover w-screen top-0"
        />
        {/* Optional: overlay */}

        <div className=" mx-auto mt-32 h-full z-20 mb-10">
          <div className="flex w-full flex-col items-center pt-16 slg:px-16 text-center ">
            <h3 className="font-semibold text-xl sm:text-2xl slg:text-4xl tracking-tighter text-white">
              Frequently Asked Question
            </h3>
            <FaqAccordion />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default page;

import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

// INTERNAL IMPORT
import { IconOne, IconTwo } from "../components/index";

const Promo = ({ setActiveComponent }) => {
  return (
    <section className="relative overflow-hidden pt-[72px] bg-default-950/40 backdrop-blur-3xl">
      <div className="absolute h-14 w-14 bg-primary/10 top-2/3 start-80 -z-1 rounded-2xl rounded-tl-none rounded-br-none animate-[spin_10s_linear_infinite]"></div>

      <div className="absolute h-14 w-14 bg-primary/10 -z-1 rounded-full animate-ping"></div>

      <div className="px-6 pt-20 overflow-hidden">
        <div className="relative">
          <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-default-300/70 [mask-image:liner-gradient(to_bottom, white_20%, transparent_75%)] sm: top-16 -translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
            <IconOne />
            <IconTwo />
          </div>

          <div className="container">
            <div className="py-14 text-center relative">
              <div className="flex justify-center">
                <div className="max-w-2xl">
                  <h2 className="md:text-6xl/tight text-5xl text-default-100 font-semibold mb-6">
                    Sorry, currently you have no pool data
                  </h2>
                  <p className="text-base text-default-200 font-medium px-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                    eveniet, quas repellendus, esse accusamus omnis a maiores
                    vel cumque porro, aliquam harum? Iste deleniti animi
                    laudantium necessitatibus, numquam molestias nisi dicta
                    sequi perspiciatis atque. Voluptatem expedita deserunt sed
                    explicabo vel voluptate natus minima? Modi mollitia, dicta
                    deleniti qui sapiente hic.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                    <a
                      onClick={() => setActiveComponent("Home")}
                      className="inline-flex items-center justify-center gap-2 bg-primaty text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300 cursor-pointer"
                    >
                      Get Pool Address
                      <FaArrowRightLong />
                    </a>
                    <a
                      onClick={() => setActiveComponent("Liqudity")}
                      className="inline-flex items-center justify-center border border-white/10 gap-2 bg-primaty text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-300 cursor-pointer"
                    >
                      Liqudity
                      <FaArrowRightLong />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;

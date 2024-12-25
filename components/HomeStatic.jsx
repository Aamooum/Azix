import Link from "next/link";
import Image from "next/image";
import homeImg1 from "@public/homeImg1.jpg";

const HomeStatic = () => {
  return (
    <div>
      <div className="relative h-[80vh] w-full border-2 border-black border-t-0 overflow-hidden">
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl h-[20vh]">ABOUT BRAND</p>
        <div className="flex border-2 border-black max-480:flex-col min-481-max-834:flex-col">
          <Image 
            src={homeImg1} 
            alt="cover 1" 
            className="max-480:w-screen object-cover max-480:border-b-2 max-480:border-black min-481-max-834:border-b-2 min-481-max-834:border-black min-835:w-[40vw]" 
          />
          <div className="flex flex-col justify-center gap-16 items-center border-l-2 border-black max-480:w-full max-480:gap-8 max-480:border-0 min-481-max-834:border-0 min-481-max-834:gap-14">
            <h1 className="text-6xl font-semibold mx-24 max-480:text-2xl max-480:ml-4 max-480:mr-10 max-480:mt-8 min-481-max-834:mt-10 min-835:pt-8">
              CATSSTAC [MILITARY FUNCTION PREFERRED BRAND]
            </h1>
            <p className="text-lg mr-24 ml-44 flex flex-col gap-10 max-480:mr-4 max-480:ml-10">
              In recent seasons, the popular style of wear and play, the sporty style has been born, and the combination of functional style is definitely one of the current crazes for the market. The brand conveys the opposite and integration of design ideas. We design military, street, and functional styles combined.
              <span className="max-480:pb-8 min-481-max-834:pb-8 min-835:pb-8">
                <Link href="/about" className="underline hover:no-underline font-semibold">Read More</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStatic;

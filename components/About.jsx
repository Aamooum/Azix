export const dynamic = 'force-static'

import Link from 'next/link'
import Image from 'next/image'
import cover1 from "@public/aboutImg1.jpeg"
import cover2 from "@public/aboutImg2.jpeg"
import cover3 from "@public/aboutImg3.jpeg"
import cover4 from "@public/aboutImg4.jpg"
import cover5 from "@public/aboutImg5.jpeg"
import Footer from '@components/Footer'
import { MoveRight } from 'lucide-react'

const About = () => {
  return (
    <div>
           
      <Image src={cover1} alt='slide image' className="border-2 border-black border-t-0  h-[80vh] w-full object-cover " />
      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl h-[20vh] ">BRAND STYLE</p>
        <div 
          className="grid grid-cols-2 border-2 border-black
          max-480:grid-cols-1
          min-481-max-834:grid-cols-1"
        >
          <Image 
            src={cover3} 
            className='border-r-2 border-black object-cover
            max-480:border-r-0
            max-480:border-b-2
            min-481-max-834:border-r-0
            min-481-max-834:border-b-2'  
          />
              
          <div 
            className="flex flex-col justify-center	gap-12 items-center
            max-480:gap-8
            min-481-max-834:gap-10"
          >
            <h1 
              className="text-5xl font-semibold mx-10
              max-480:text-3xl
              max-480:ml-4
              max-480:mr-10
              max-480:mt-8
              min-481-max-834:mt-10
              min-835:pt-8
              min-481-max-834:text-5xl"
            >
              BEYOND TIME, GENDER AND GEOGRAPHY
            </h1>
            <p 
              className="text-lg mr-8 ml-16 flex flex-col gap-10
              max-480:ml-10
              max-480:mb-8
              min-481-max-834:mb-8" 
            >
              In recent seasons, The popular style of wear and play, the sporty style has been born, and the combination of functional style in definitely one of the current craze for the market. The brand conveys the opposite and integration of design ideas. We design military, street,The three styles of function are combined.
            </p>
    
          </div>
        </div>
      </div>
      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl h-[20vh] " >MATERIALS</p>
        <div 
          className="grid grid-cols-2 border-2 border-black
          max-480:grid-cols-1
          min-481-max-834:grid-cols-1"
        >
          <div 
            className="flex flex-col justify-center gap-8 items-center 
            max-480:gap-8
            min-481-max-834:gap-10"
          >
            <h1 
              className="text-4xl font-semibold mx-10
              max-480:mx-4
              max-480:text-3xl
              max-480:mt-8
              min-481-max-834:text-5xl
              min-481-max-834:mt-10
              min-835:mt-8"
            >
              PERFECT UPGRADE, WAITING FOR YOU TO DRIVE!
            </h1>
            <p 
              className="text-lg mr-8 ml-16 flex flex-col gap-10
              max-480:ml-10
              max-480:mr-2
              max-480:mb-8
              min-481-max-834:mb-8" 
            >
              The use of higher quality and multi-source materials and multi-splicing design techniques to show the designer's surrounding things, the design of the multi-pocket design provides a strong portability,while also enhancing the layering of the clothing, the ribbon is slightly exaggerated designed to express the tension of the younger age, the excellent version is perfectly modified, and the comfortable material makes you lighter after the upper body.
            </p>
          </div>
          <Image 
            src={cover4} 
            className='border-l-2 border-black object-cover
            max-480:border-l-0 
            max-480:border-t-2
            min-481-max-834:border-l-0
            min-481-max-834:border-t-2'
          />
        </div>
      </div>
      <div>
        <p 
          className="flex flex-col justify-center items-center border-x-2 border-black text-3xl h-[30vh]
          max-480:text-xl
          max-480:px-2
          max-480:h-[50vh]
          max-480:text-center
          min-481-max-834:h-[50vh]
          min-481-max-834:text-center
          min-481-max-834:px-2" 
        >
          <span>
            CLOTHES ARE LIFESTYLE, UNIQUENESS AND QUALITY.
          </span>
          <span>
            NO MATTER WHERE OR WITH WHOM YOU FIND YOURSELF,
          </span>
          <span>
            THE MAIN THING IS TO LOOK AND FEEL COMFORTABLE.
          </span>
        </p>
        <Image src={cover2}  className="border-2 border-black border-t-0 h-[80vh] w-full border-t-2 border-black object-cover" />
      </div>
      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl h-[20vh] " >ABOUT BRAND</p>
        <div 
          className="flex border-2 border-black
          max-480:text-xl
          max-480:flex-col
          min-481-max-834:flex-col"
        >
          <Image src={cover5}  
            className='border-r-2 border-black w-[40vw] object-cover
            max-480:border-r-0
            max-480:w-[100vw]
            max-480:border-b-2
            min-481-max-834:w-[100vw]
            min-481-max-834:border-r-0
            min-481-max-834:border-b-2
            min-481-max-834:h-[100vh]' 
          />
          <div 
            className="flex flex-col justify-center gap-10 items-center w-[60vw] 
            max-480:gap-8
            max-480:w-[99vw] 
            min-481-max-834:gap-8
            min-481-max-834:w-[100vw]" 
          >
            <h1 
              className="text-4xl font-semibold mx-10
              max-480:text-3xl
              max-480:mt-8
              max-480:mx-4
              min-481-max-834:text-5xl
              min-481-max-834:mt-8"
            >
              CATSSTAC 2020SS "THE CITY WALKER" VOL.3
            </h1>
            <p 
              className="text-lg mr-8 ml-16 flex flex-col gap-10
              max-480:ml-10
              max-480:mr-2
              max-480:mb-8
              min-481-max-834:mb-8
              min-481-max-834:mr-12" 
            >
              This year we will use the "SYSTEM RESET" system reset as the theme, reset ourselves, focus on the initial love, adjust the rhythm, and will perform 12 stable updates in the year. And pay more attention to the use of details, materials, and use more brand-made custom materials to further enhance the quality of the product, simplify the complexity, restore our purest way of playing outdoor functions, bringing a new, pure-CATSSTAC.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center border-x-2 border-b-2 border-black text-3xl gap-2 h-[20vh] " >
        <Link 
          href="/shop?page=1" 
          className='flex gap-4'
        >
          <span className='underline hover:no-underline'>Shop the collection</span>
          <span>
            <MoveRight size={40} />
          </span>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default About
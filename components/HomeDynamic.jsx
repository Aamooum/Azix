"use client";
import Products from "@components/Products";
import RecommendProduct from "@components/RecommendProduct";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { getSession } from "next-auth/react";
import { useCookies } from 'next-client-cookies';
import { MoveRight } from "lucide-react";


const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const HomeDynamic = () => {
  const cookies = useCookies();
  const [newArrivals, setNewArrivals] = useState([]);
  const hasLoaded = useRef(false);

  const getSessionGuest = async () => {
    const session = await getSession();
    if (!session?.user?.role && !cookies.get('sessionId')) {
      await fetch("/api/guest/session");
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch("/api/product/new-arrivals");
      const jsonResponse = await response.json();
      setNewArrivals(jsonResponse);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    getSessionGuest();
    fetchNewArrivals();
    hasLoaded.current = true;
  }, []);

  return (
    <div>
      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl h-[20vh]">
          NEW ARRIVALS
        </p>
        <div>
          <Products products={newArrivals} height="h-[50vh]" />
          <div className="flex justify-between items-center px-4 text-xl h-12 border-2 border-black border-t-0">
            <Link href="/shop" className="underline hover:no-underline">Shop the collection</Link>
            <Link href="/shop"><MoveRight size={40} /></Link>
          </div>
        </div>
      </div>
      <div>
        <p className="flex flex-col justify-center items-center border-x-2 border-black text-3xl font-semibold h-[50vh] px-4 text-center max-480:text-xl min-481-max-834:text-2xl">
          WE ARE THE LAND COMBAT GROUP OUR DUTY IS TO CREATE THE WALKING ARMOR TO PROTECT OURSELVES IN THE REINFORCED CONCRETE FOREST
        </p>
        <div className="w-[100vw] h-[70vh] border-2 border-black">
          <ReactPlayer url='https://www.youtube.com/watch?v=Sbx3hDI7L_s' width='100%' height='100%' />
        </div>
      </div>
      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl h-[20vh]">
          WE RECOMMEND
        </p>
        <div>
          <RecommendProduct products={newArrivals.slice(0, 2)} />
        </div>
      </div>
      <div>
        <p className="flex justify-center items-center border-x-2 border-black text-3xl max-480:text-center h-[20vh]">
          WE ARE ON INSTAGRAM
        </p>
        <div />
      </div>
    </div>
  );
};

export default HomeDynamic;

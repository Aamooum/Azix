"use client"
import Link from 'next/link'
import { useState,useEffect,useRef } from 'react'
import { signOut } from "next-auth/react"
import { getSession } from 'next-auth/react';
import NavbarLoadSkeleton from './NavbarLoadSkeleton';


const Navbar = () => {

  const isEffectRun = useRef(false)
  const [disp,setDisp] = useState(false)
  const [sign ,setSign] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [role,setRole] = useState("")

  const sessionData = async() => {

    const session = await getSession();
    
    if(session?.user?.role === undefined){
      setRole('Guest')
    }
    if (session?.user?.role === "user"){
      setSign(true)
      setRole('User')
    }
    if (session?.user?.role === "admin"){
      setSign(true)
      setRole('admin')
    }
    setIsLoading(false)
  }

  useEffect(()=> {
    if(isEffectRun.current) return;
    sessionData()
    isEffectRun.current = true
  })

  return (
    
    isLoading 
    ? 
    <NavbarLoadSkeleton />
    : 
    <>

      <div className='h-16 border-2 border-black border-t-0 text min-835:hidden'>
          <div className={`flex justify-end items-center h-full  bg-white brgr-icon min-835:hidden`} onClick={()=>setDisp((prev)=>!prev)}>
            <h2 className='w-[5rem]   h-full bg-white flex justify-center items-center font-bold text-l border-l-2 border-black'> {!disp ?'MENU' :"CLOSE"}</h2>
          </div>
      </div>

      <nav className={`grid min-835:grid-cols-5 text-center gap-0.5  border-b-2 border-x-2 border-black  bg-black ${disp ? "max-480:block min-481-max-834:block" : "max-480:hidden min-481-max-834:hidden"} min-481-max-834:gap-0 max-480:gap-0`}>
        <>

          <Link 
            href={"/"}  
            className='font-bold  text-5xl bg-white h-16 w-full flex items-center justify-center text-black hover:bg-black hover:text-white '
          >
            AZIX
          </Link>
          <Link href={"/about"} className='font-medium bg-white h-16 w-full flex items-center justify-center text-black hover:bg-black hover:text-white '>
            ABOUT
          </Link>
          <Link href={"/shop?page=1"} className='font-medium bg-white h-16 w-full flex items-center text-black justify-center hover:bg-black hover:text-white '>
            SHOP
          </Link>
          <Link href={role !== "admin" ? "/shopping-bag" : "/create-product"} 
          className='font-medium bg-white h-16 w-full flex items-center text-black justify-center hover:bg-black hover:text-white '>
            { role !== "admin" ? "SHOPPING BAG" : "CREATE PRODUCT"}
          </Link>
          {
            sign 
            ? 
            <>
              <div 
                className='font-medium bg-white h-16 w-full flex items-center justify-center text-black hover:bg-black hover:text-white hover:cursor-pointer'                onClick={() => signOut()}
              >
                 Log out
              </div>
             
            </>
            : 
            <Link href="/signin" className='font-medium bg-white h-16 w-full flex items-center justify-center text-black hover:bg-black hover:text-white'>
              SIGN IN
            </Link>
          }
        </>
      </nav>
    </>
  )

}

export default Navbar

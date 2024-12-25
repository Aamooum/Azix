"use client"
import { UploadDropzone } from "@uploadthing/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  useState,useRef,useEffect } from "react";

const CreateProductForm = () => {
    const [images, setImages] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const router = useRouter()
    const isEffectRun = useRef(false)

    const sessionData = async() => {
  
      const session = await getSession();
      
      if(session?.user?.role !== "admin"){
        router.push('/401')
      }else{

        setIsLoading(false)
      }
  
    }
  
    useEffect(()=> {
      if(isEffectRun.current) return;
      sessionData()
      isEffectRun.current = true
    
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (images.length === 0) {
            return alert('Please add images');
        }
    
        try {
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title');
            const color = formData.get('color');
            const price = +formData.get('price') > 0 ? +formData.get('price') : 0;
            const desc = formData.get('desc');
            const gender = formData.get('gender');
            const categoriesSeason = formData.get('categories-season');
            const categoriesMateriel = formData.getAll('categories-material');
            const size = JSON.stringify({
                s: +formData.get('size-s') > 0 ? +formData.get('size-s') : 0,
                m: +formData.get('size-m') > 0 ? +formData.get('size-m') : 0,
                l: +formData.get('size-l') > 0 ? +formData.get('size-l') : 0,
                xl: +formData.get('size-xl') > 0 ? +formData.get('size-xl') : 0,
            });
    
            const response = await fetch("/api/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    color,
                    price,
                    desc,
                    gender,
                    categoriesSeason,
                    categoriesMateriel,
                    size,
                    images,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to submit: ${response.statusText}`);
            }
    
            const responseData = await response.json();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
  return (
    !isLoading ?
    <form className="mx-10 pt-28 " onSubmit={handleSubmit}>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            title of the product :
            </label>
            <div className="mt-2">
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="title of the product"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
            color of the product :
            </label>
            <div className="mt-2">
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                
                <input
                  id="color"
                  name="color"
                  type="text"
                  placeholder="title of the product"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
              About
            </label>
            <div className="mt-2">
              <textarea
                id="desc"
                name="desc"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
          </div>
          <div className="sm:col-span-4 " style={{width:"90vw"}}>
            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
            Sizes of the product : 
            </label>
            <div className="mt-2 flex 
            max-480:flex-col 
            min-481-max-834:flex-col 
            max-480:mr-10">
              <label htmlFor="size-s" className="block text-sm font-medium leading-6 text-gray-900 mx-4">
               S : 
              </label>
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              
                <input
                  id="size-s"
                  name="size-s"
                  type="text"
                  placeholder="quntity of size S"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <label htmlFor="size-m" className="block text-sm font-medium leading-6 text-gray-900 mx-4">
               M : 
              </label>
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              
                <input
                  id="size-m"
                  name="size-m"
                  type="text"
                  placeholder="quntity of size M"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <label htmlFor="size-l" className="block text-sm font-medium leading-6 text-gray-900 mx-4">
               L : 
              </label>
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              
                <input
                  id="size-l"
                  name="size-l"
                  type="text"
                  placeholder="quntity of size L"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
              <label htmlFor="size-xl" className="block text-sm font-medium leading-6 text-gray-900 mx-4">
               Xl : 
              </label>
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
              
                <input
                  id="size-xl"
                  name="size-xl"
                  type="text"
                  placeholder="quntity of size XL"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4 ">
            <label className="text-sm font-semibold leading-6 text-gray-900">Gender : </label>
            <p className="mt-1 text-sm leading-6 text-gray-600">Select this option if the product is intended for...</p>
            <div className="mt-4 space-y-6 ml-8">
              <div className="flex items-center gap-x-3">
                <input
                  id="gender"
                  name="gender"
                  value="Unisex"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Unisex
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="gender"
                  name="gender"
                  value="Male"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                  Male
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="gender"
                  name="gender"
                  value="Females"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                  Females
                </label>
              </div>
            </div>
          </div>
          <div className="sm:col-span-4 ">
            <label className="text-sm font-semibold leading-6 text-gray-900">Type : </label>
            <p className="mt-1 text-sm leading-6 text-gray-600">Select this option if the product is intended for...</p>
            <div className="mt-4 space-y-6 ml-8">
              <div className="flex items-center gap-x-3">
                <input
                  id="type"
                  name="type"
                  value="T-shirt"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                T-shirt
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="type"
                  name="type"
                  value="Hoodies"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                  Hoodies
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="type"
                  name="type"
                  value="Jeans"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                Jeans
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="type"
                  name="type"
                  value="Tank Tops"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                Tank Tops
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="type"
                  name="type"
                  value="Sweaters"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                Sweaters
                </label>
              </div>
  
              
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 sm:col-span-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Categories:</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-4 space-y-5 ml-8">
              <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Season</legend>
              <div className="mt-4 space-y-6">
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-season"
                      name="categories-season"
                      value="Spring"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-season" className="font-medium text-gray-900">
                      Spring 
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-season"
                      name="categories-season"
                      value="Summer"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-season" className="font-medium text-gray-900">
                      Summer 
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-season"
                      name="categories-season"
                      value="Fall"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-season" className="font-medium text-gray-900">
                      Fall 
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-season"
                      name="categories-season"
                      value="Winter"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-season" className="font-medium text-gray-900">
                      Winter 
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-season"
                      name="categories-season"
                      value="Year-Round"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-season" className="font-medium text-gray-900">
                      Year-Round
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
              </div>
              </fieldset>
              <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Material</legend>
              <div className="mt-4 space-y-6">
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-material"
                      name="categories-material"
                      value="Cotton"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-material" className="font-medium text-gray-900">
                      Cotton
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-material"
                      name="categories-material"
                      value="Polyester"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-material" className="font-medium text-gray-900">
                      Polyester
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-material"
                      name="categories-material"
                      value="Wool"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-material" className="font-medium text-gray-900">
                      Wool
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-material"
                      name="categories-material"
                      value="Denim"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-material" className="font-medium text-gray-900">
                      Denim
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-material"
                      name="categories-material"
                      value="Silk"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-material" className="font-medium text-gray-900">
                      Silk
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
                  <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                      <input
                      id="categories-material"
                      name="categories-material"
                      value="Spandex"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                  </div>
                  <div className="text-sm leading-6">
                      <label htmlFor="categories-material" className="font-medium text-gray-900">
                      Spandex
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                  </div>
              </div>
              </fieldset>
          </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            price of the product :
            </label>
            <div className="mt-2">
              <div className="flex shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="price of the product"
                
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className=" flex items-center gap-x-3 justify-center">
              
            <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                  const test = []
                  for (let i=0 ; i<res.length ; i++){
                      test.push(res[i].url)
                      setImages(test)
                  }
                  }}
                  onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                  }}
              />
            </div>
          </div>
      </div>
      </div>
      </div>
      <div className="flex justify-center">
      <button 
  type="submit" 
  className=" flex w-screen justify-center rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-500 sm:ml-3 sm:w-auto"
>
  Submit
</button>
      </div>

  </form> : <h1>Is Loading...</h1>
  )
}

export default CreateProductForm
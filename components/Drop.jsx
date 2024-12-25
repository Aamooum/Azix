"use client"
import { useMemo,useState,useCallback, useEffect, useRef } from 'react'
import Dropdown from './Dropdown'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
const Drop = () => {

  const router = useRouter()
  const searchParams = useSearchParams();
  
  const options = ['types', 'sizes', 'colors', 'genders'];

  const firston = () =>{
      const newSelectedOptions = options.reduce((acc, option) => {
        acc[option] = [...(searchParams.get(option)?.split(",") || [])]; 
          return acc;
      }, {});
  
      return newSelectedOptions
    }
  const [selectedOptions, setSelectedOptions] = useState(firston);

  const [isOpen, setIsOpen] = useState({
      types: false,
      sizes: false,
      colors: false,
    });

  const initialValue = () =>{
    if(+searchParams.get("page") == 0 || isNaN(+searchParams.get("page"))) return 1;
    return +searchParams.get("page");
  }
  const [currPage, setCurrPage] = useState(initialValue);

  const types = useMemo(() => ["Summer"], []);
  const sizes = useMemo(() => ["S", "M", "L", "XL"], []);
  const colors = useMemo(() => ["Green", "Black", "White","Red","Yellow","Orange","Pink","Blue"], []);
  const genders = useMemo(() => ["Male"], []);
  const test = useRef(true)
  useEffect(()=>{
    if (test.current) return;
    const query = options
    .filter(option => selectedOptions[option].length > 0)
    .map(option => `${option}=${selectedOptions[option].join(',')}`)
    .join('&');
    
    const toto = query && `&${query}` 
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/shop?page=${currPage+toto}`)
  },[selectedOptions])


  const toggleDropdown = useCallback((category) => {
    setIsOpen((prevIsOpen) => ({
      ...prevIsOpen,
      [category]: !prevIsOpen[category],
    }));
  }, []);

  const handleResetFilter = async () => {

    if(selectedOptions.types.length > 0 || 
      selectedOptions.sizes.length > 0 || 
      selectedOptions.colors.length > 0 || 
      selectedOptions.genders.length > 0)
    {
        setSelectedOptions({
          types: [],
          sizes: [],
          colors: [],
          genders: [],
        });
        router.push("/xoxo")
    }
  };
  const handleSort = () => {
    const query = options
      .filter(option => selectedOptions[option].length > 0)
      .map(option => `${option}=${selectedOptions[option].join(',')}`)
      .join('&');
    
    const queryString = query ? `&${query}` : '';
    
    let sortedProduct;
    if (searchParams.get('sorted') === null) {
      sortedProduct = true;
    } else {
      sortedProduct = searchParams.get('sorted') !== "true";
    }
  
    const newUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/shop?page=${currPage}${queryString}&sorted=${sortedProduct}`;
    
    router.push(newUrl);
  };
  
        
  const handleOptionChange = useCallback((category, option) => {
      setSelectedOptions((prevSelected) => {
        const updatedOptions = { ...prevSelected };
        if (updatedOptions[category].includes(option)) {
          updatedOptions[category] = updatedOptions[category].filter(
            (item) => item !== option
          );
          
        } else {
          updatedOptions[category] = [...updatedOptions[category], option];
          
          if (currPage>1){
            setCurrPage(1)
          }
         
        }
        test.current = false
        return updatedOptions;
      });
  }, [currPage]);
      

  return (
    <div className="filters grid grid-cols-4 border-t-2 border-black max-480:grid-cols-1 min-481-max-834:grid-cols-2 border-x border-black" >
      
    <div className="grid grid-cols-2 border-x border-black" >
      <div className="border-r border-black">
        <Dropdown
            category="types"
            options={types}
            selectedOptions={selectedOptions}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleOptionChange={handleOptionChange}
          
          />
        </div>
        <div className="border-l border-black" >
          <Dropdown
            category="sizes"
            options={sizes}
            selectedOptions={selectedOptions}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleOptionChange={handleOptionChange}
          />
        </div>
    </div>
      
      <div className="filter-colors-genders grid grid-cols-2 max-480:border-t-2 max-480:border-black border-x border-black">
        <div className="border-r border-black" >
          <Dropdown
            category="colors"
            options={colors}
            selectedOptions={selectedOptions}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleOptionChange={handleOptionChange}
          />
        </div>
        <div className="border-l border-black" >
          <Dropdown
            category="genders"
            options={genders}
            selectedOptions={selectedOptions}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleOptionChange={handleOptionChange}
          />
        </div>
      </div>
    <div className="min-481-max-834:border-t-2 min-481-max-834:border-black border-x border-black"></div>
    <div className="grid grid-cols-2 max-480:border-t-2 max-480:border-black min-481-max-834:border-t-2 min-481-max-834:border-black border-x border-black">
      <div className="filter-reset bg-white flex items-center  border-r border-black">
        <button
          onClick={handleResetFilter}
          className=" w-full h-full text-left p-[0.5rem] hover:bg-black hover:text-white"
        >
          <div>
            Reset filters
          </div>
        </button>
      </div>
      <div  className="filter-sort bg-white flex items-center border-l border-black">
        <button
          className=" w-full h-full  text-left p-[0.5rem] hover:bg-black hover:text-white"
          onClick={handleSort}
        >
          Sorted
        </button>
      </div>
    </div>
  </div>
  )
}

export default Drop
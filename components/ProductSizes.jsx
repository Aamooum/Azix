import Link from 'next/link'
const ProductSizes = ({size,setSize,allSize}) => {
    const handleNewSize = (newSize) => {
        setSize(newSize);
      };
  return (
    <div>
      <div className='flex justify-between'>
        <p className='text-lg'>Size: {size}</p>
        <Link href="#" className='underline text-lg hover:no-underline'>Size Guide</Link>
        </div>
        <div className='flex items-center w-full border-2 border-black border-r-0 my-3'>
          {['S', 'M', 'L', 'XL'].map(sz => (
            <button
              key={sz}
              className={`w-1/4 h-12 flex justify-center items-center border-r-2 border-black ${(allSize[sz.toLowerCase()] > 0) && "hover:bg-black hover:text-white cursor-pointer"} text-lg ${size === sz && "bg-black text-white"} ${!(allSize[sz.toLowerCase()] > 0) && "bg-slate-200"}`}
              onClick={() => handleNewSize(sz)}
              disabled={!(allSize[sz.toLowerCase()] > 0)}
              >
                {sz}
              </button>
            ))}
        </div>
    </div>
  )
}

export default ProductSizes
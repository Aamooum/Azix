import Image from "next/image"
const ProductImages = ({productImage,setProductImage}) => {
    const handleImageChange = (i) => {
        const updatedImages = [...productImage];
        const coverImg = updatedImages[0];
        updatedImages[0] = updatedImages[i];
        updatedImages[i] = coverImg;
        setProductImage(updatedImages);
      };
      
  return (
    <div className=' h-[80vh] bg-gray-100'>
    {productImage.map((im, index) => (
        index === 0 ?
        <Image
            key={index}
            width={1000}
            height={1000}
            src={im}
            alt={`Product image ${index}`}
            className='absolute z-0 border-2 border-black object-contain border-y-0 w-1/2 h-[80vh] min-481-max-834:w-full min-481-max-834:border-r-4 min-481-max-834:border-b-4 max-480:w-full max-480:border-r-4 max-480:border-b-2'
        />
        :
            <Image
            width={100}
            height={100}
            src={im}
            alt={`Product image ${index}`}
            onClick={() => handleImageChange(index)}
            className={`relative z-1 border border-black opacity-50 hover:opacity-100 top-10  w-[8%]`}
            />
        ))}
    </div>
  )
}

export default ProductImages
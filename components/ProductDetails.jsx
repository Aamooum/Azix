const ProductDetails = ({product}) => {
  return (
    <div className='border-b-2 border-black px-16 py-6 flex flex-col gap-3 max-480:px-8 max-480:border-x-2 max-480:border-black min-835:px-8'>
    <h2 className='text-2xl'>{product.title}</h2>
    <p className='text-lg'>{product.gender} Model</p>
    <p className='text-xl font-normal'>$ {product.price}</p>
  </div>
  )
}

export default ProductDetails
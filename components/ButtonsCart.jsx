import Link from 'next/link';

const ButtonsCart = () => {
  return (
    <div className='grid grid-cols-2 gap-10 h-16 my-20 max-480:gap-2 min-481-max-834:gap-4'>
      <Link 
        href="/shop"
        className='border border-black w-full flex justify-center items-center hover:bg-black hover:text-white max-480:text-center'
      >
        CONTINUE SHOPPING
      </Link>
      <Link 
        href="/pay"
        className='border border-black bg-black text-white w-full flex justify-center items-center hover:bg-white hover:text-black'
      >
        CHECKOUT
      </Link>
    </div>
  );
};

export default ButtonsCart;

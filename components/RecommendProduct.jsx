import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MoveRight } from 'lucide-react';
import React from 'react';
const RecommendProduct = ({ products }) => {
  const router = useRouter();

  return (
    <div className='grid grid-cols-2 gap-0.5 bg-black border-2 border-black max-480:grid-cols-1'>
      {products.map((item, index) => (
        <React.Fragment key={item._id}>
          <div onClick={() => router.push(`/shop/${item._id}`)}>
            <Image
              alt={item.title}
              height={1000}
              width={1000}
              src={item.images[1]}
              className={`bg-white w-full object-cover ${index === 0 ? 'max-480:p-12 max-480:w-[100vw] max-480:h-[80vh]' : 'max-480:w-[100vw] max-480:h-[80vh]'}`}
            />
            <div className='flex justify-between items-center px-4 bg-white border-t-2 border-black text-lg font-semibold max-480:h-20 max-480:text-base h-20'>
              <Link href={`/shop/${item._id}`}>{item.title}</Link>
              <Link href={`/shop/${item._id}`}>${item.price} USD</Link>
            </div>
          </div>
          <div>
            <Image
              alt={item.title}
              height={1000}
              width={1000}
              src={item.images[2]}
              className={`bg-white w-full object-cover ${index === 1 ? 'max-480:p-12 max-480:w-[100vw] max-480:h-[80vh]' : 'max-480:w-[100vw] max-480:h-[80vh]'}`}
            />
            <div className='flex justify-between items-center px-4 bg-white border-t-2 border-black text-lg font-semibold h-20 max-480:h-[10vh]'>
              <Link href="/shop">All T-SHIRTS</Link>
              <Link href="/shop"><MoveRight size={40} /></Link>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RecommendProduct;

import '@styles/skeletonAnimation.css';

const ShoppingBagLoadSkeleton = () => {
  return (
    <div className='mx-20'>
      <div className='flex h-16 mt-5 mb-1'>
        <div className='w-4/12 border-r-2 border-white'>
          <div className="skeleton-animated"></div>
        </div>
        <div className='w-1/12 border-r-2 border-white'>
          <div className="skeleton-animated"></div>
        </div>
        <div className='w-1/12 border-r-2 border-white'>
          <div className="skeleton-animated"></div>
        </div>
        <div className='w-4/12 border-r-2 border-white'>
          <div className="skeleton-animated"></div>
        </div>
        <div className='w-2/12'>
          <div className="skeleton-animated"></div>
        </div>
      </div>
      <div className="border-2 border-white flex border-l-0 border-t-0 h-20 h-[10rem]">
        <div className='border-t-2 border-white'>
          <div className="skeleton-animated border-r-2 border-white w-[8rem] h-[9.8rem]"></div>
        </div>
        <div className='w-full h-full border-t border-white'>
          <div className="skeleton-animated"></div>
        </div>
      </div>
      <div className="border-2 border-white flex border-l-0 border-t-0 h-20 h-[10rem]">
        <div className=''>
          <div className="skeleton-animated border-r-2 border-white w-[8rem] h-[9.87rem]"></div>
        </div>
        <div className='w-full h-full'>
          <div className="skeleton-animated"></div>
        </div>
      </div>
      <div className='flex justify-end my-2 h-16 w-full'>
        <div className='w-96 flex gap-1'>
          <div className="skeleton-animated"></div>
          <div className="skeleton-animated"></div>
        </div>
      </div>
      <div className='text-xl font-semibold flex justify-end gap-5 my-8 h-16'>
        <div className="skeleton-animated"></div>
        <div className="skeleton-animated"></div>
      </div>
    </div>
  );
};

export default ShoppingBagLoadSkeleton;

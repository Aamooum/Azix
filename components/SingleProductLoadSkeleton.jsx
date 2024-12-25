import { memo } from 'react';

const SkeletonCard = memo(() => {
  return (
    <div style={{ border: "solid 1px white" }}>
      <div className="w-full h-96">
        <div className="skeleton-animated"></div>
      </div>
      <div className="h-20 border-t-2 border-white">
        <div className="skeleton-animated"></div>
      </div>
    </div>
  );
});

const SingleProductLoadSkeleton = () => {
  return (
    <div>
      <div className='grid grid-cols-2 gap-0.5 h-[80vh] border-x-2 border-white max-480:grid-cols-1 min-481-max-834:grid-cols-1'>
        <div className="skeleton-animated"></div>
        <div className="skeleton-animated"></div>
      </div>
      <div>
        <div className="skeleton-animated" style={{ height: "3.5rem", border: "solid 2px white", borderBottom: "none" }}></div>
      </div>
      <div className='grid grid-cols-4 border border-white max-480:grid-cols-1 min-481-max-834:grid-cols-2'>
        {Array(4).fill().map((_, index) => <SkeletonCard key={index} />)}
      </div>
      <div>
        <div className="skeleton-animated" style={{ height: "3.5rem", border: "solid 2px white", borderTop: "none", borderBottom: "none" }}></div>
      </div>
      <div className='grid grid-cols-4 border border-white max-480:grid-cols-1 min-481-max-834:grid-cols-2'>
        {Array(4).fill().map((_, index) => <SkeletonCard key={index} />)}
      </div>
    </div>
  );
};

export default SingleProductLoadSkeleton;

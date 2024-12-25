import '@styles/skeletonAnimation.css';

const NavbarLoadSkeleton = () => {
  return (
    <nav className='grid grid-cols-5 text-center gap-0.5 border-b-2 border-x-2 border-white bg-white h-16 max-480:grid-cols-1 min-481-max-834:grid-cols-1 min-481-max-834:h-[14vh] max-480:h-[14vh]'>
      {Array(5).fill(null).map((_, index) => (
        <div key={index} className={`${index > 0 ? 'min-481-max-834:hidden max-480:hidden' : ''}`}>
          <div className="skeleton-animated"></div>
        </div>
      ))}
    </nav>
  );
};

export default NavbarLoadSkeleton;

"use client"

import { useState } from "react";

const AdditionProductInfo = ({ title, details }) => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);

  const handleDisplayToggle = () => {
    setIsOpenFirst((prev) => !prev)
  };

  return (
    <div className='border-b-2 border-black cursor-pointer' onClick={ handleDisplayToggle}>
      <div className='flex justify-between items-center text-xl py-3 px-16 max-480:px-8 max-480:border-x-2 max-480:border-black min-835:px-8'>
        <h2>{title}</h2>
        <div className='text-4xl ' >
          {!isOpenFirst ? "-" : "+"}
        </div>
      </div>
      <div>
        {isOpenFirst && (
          <div className='pb-4 border-x border-black max-480:px-8 max-480:pt-8 max-480:border-2 max-480:border-black min-835:px-8 min-835:pt-8 min-835:border-y-2 min-835:border-black bg-white absolute z-10'>
            {details.split('\n').map((line, index) => (
              <div key={index}>{line}<br /></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionProductInfo;

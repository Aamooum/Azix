import Link from "next/link";
import { memo } from "react";

const Pagination = memo(({ productsStatus, query, currPage }) => {
  return (
    <div className="grid grid-cols-4 h-10 border-x border-black">
      <div className="border-x border-black"></div>
      <div className="col-span-2 flex justify-center gap-1 border-x border-black">
        {productsStatus.pages > 1 && Array.from({ length: productsStatus.pages }, (_, i) => (
          <Link
            href={`?page=${i + 1}${query}`}
            key={i}
            className={`text-xl font-bold flex items-center ${
              currPage === i + 1 ? 'text-red-500' : 'text-black'
            } hover:text-red-500 active:ring-violet-300`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <div className="border-x border-black"></div>
    </div>
  );
});

export default Pagination;

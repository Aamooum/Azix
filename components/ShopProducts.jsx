export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import Drop from "@components/Drop";
import Pagination from "./Pagination";
import Products from './Products';

const ShopProducts = async ({ searchParams }) => {
  const options = ['types', 'sizes', 'colors', 'genders'];
  const query = options
    .filter(option => typeof searchParams[option] !== 'undefined' && searchParams[option]?.length > 0)
    .map(option => `${option}=${searchParams[option].split(',').join(',')}`)
    .join('&');
  
  const toto = query && `&${query}`;
  let page = 1;

  if (+searchParams.page === 0 || isNaN(+searchParams.page)) {
    redirect('/shop?page=1');
  } else {
    page = +searchParams.page;
  }

  const [productsStatus, jsonRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/status?${toto}`)
      .then(res => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product?page=${page}${toto}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.API_KEY,
      },
    }).then(res => res.json())
  ]);

  let products = searchParams?.sorted && searchParams?.sorted === 'true'
    ? [...jsonRes].sort((a, b) => new Date(a.date) - new Date(b.date))
    : [...jsonRes].sort((a, b) => new Date(b.date) - new Date(a.date));

  while (products.length % 4 !== 0) {
    const x = { "_id": products.length, "images": [""], "title": "", "price": "" };
    products.push(x);
  }

  return (
    <main>
      <div className="h-80 flex justify-center items-center border-x-2 border-black min-835:h-[40vh]">
        <div className="flex">
          <h1 className="text-6xl font-semibold mt-3">SHOP</h1>
          <p className="text-3xl items-baseline">({productsStatus.items})</p>
        </div>
      </div>
      <Drop />
      <Products products={products} />
      <Pagination
        productsStatus={productsStatus}
        currPage={page}
        query={toto}
      />
    </main>
  );
};

export default ShopProducts;

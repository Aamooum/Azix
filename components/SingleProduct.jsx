"use client"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import MarqueeAnimation from '@components/MarqueeAnimation';
import SingleProductLoadSkeleton from '@components/SingleProductLoadSkeleton'
import Products from './Products'
import ProductSizes from './ProductSizes'
import AddToShoppingBagBtn from './AddToShoppingBagBtn'
import ProductDetails from './ProductDetails'
import AdditionProductInfo from './AdditionProductInfo'
import ProductImages from './ProductImages'

const SingleProduct = () => {

    const test = useRef(false);
    const sess = useRef(false);
    
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productImage, setProductImage] = useState([]);
    const [size, setSize] = useState("Out of stock");
    const [outStock, setOutStock] = useState(true);
    const [allSize, setAllSize] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const pathname = usePathname();
    const router = useRouter();
    const productId = pathname.split("/").pop();
  
    const handleSizeStock = (sizes) => {
      for (const size in sizes) {
        if (sizes[size] > 0) {
          setSize(size.toUpperCase());
          setOutStock(false);
          break;
        }
      }
    };
  
    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        if (response.status === 401) {
          router.push("/401");
        } else if (response.status === 500) {
          router.push("/500");
        } else {
          const responseJson = await response.json();
          setState(responseJson);
        }
      } catch (err) {
        console.error('err', err);
      }
    };
  
    useEffect(() => {
      if (test.current) return;
      fetchData(`/api/product/${productId}`, (data) => {
        setProduct(data);
        setProductImage(data.images);
        const sizes = JSON.parse(data.size);
        setAllSize(sizes);
        handleSizeStock(sizes);
      }).finally(() => {
        setLoading(true);
        sess.current = true;
      });
      test.current = true;
    }, []);
  
    useEffect(() => {
      if (!sess.current) return;
      fetchData(`/api/product/${productId}/related-products`, setRelatedProducts);
    }, [product]);
  
    return (
      loading ? (
        <>
          <div className='grid grid-cols-2 min-481-max-834:grid-cols-1 max-480:grid-cols-1'>
            <ProductImages productImage={productImage} setProductImage={setProductImage} />
            <div className='w-[100%] h-[80vh] border-r-2 border-black min-481-max-834:w-[100vw] min-481-max-834:h-[160vh] max-480:w-[100vw] max-480:h-[100vh]'>
              <ProductDetails product={product} />
              <div className='border-b-2 border-black px-16 py-6 flex flex-col gap-3 max-480:px-4 max-480:border-x-2 max-480:border-black min-835:px-8'>
                <p className='text-lg'>Color: {product.color}</p>
                <ProductSizes size={size} allSize={allSize} setSize={setSize} />
                <AddToShoppingBagBtn outStock={outStock} product={product} size={size} />
              </div>
              <AdditionProductInfo title={"Details"} details={product.desc} />
              <AdditionProductInfo title={"Shipping & Returns"} details={product.desc} />
            </div>
          </div>
          {relatedProducts.length > 0 && <MarqueeAnimation title="related products" />}
          <Products products={relatedProducts.slice(0, 4)} />
    
        </>
      ) : <SingleProductLoadSkeleton />
    );
  };
  
  export default SingleProduct;
  
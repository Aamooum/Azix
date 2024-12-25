"use client";
import { useEffect, useRef, useState } from 'react';
import SubtotalCart from './SubtotalCart';
import ButtonsCart from './ButtonsCart';
import ShoppingBagLoadSkeleton from './ShoppingBagLoadSkeleton';
import { Minus, Plus } from 'lucide-react';

const CartProducts = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const wait = useRef(false);
    const sec = useRef(true);

    const fetchCartData = async () => {
        try {
            const response = await fetch("/api/shopping-bag", { method: "GET" });
            const data = await response.json();
            const { shoppingBag } = data;

            if (!shoppingBag) {
                throw new Error('No shopping bag available.');
            }

            setCartData(shoppingBag);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        } finally {
            setLoading(false);
            sec.current = false;
        }
    };

    useEffect(() => {
        if (wait.current) return;
        fetchCartData();
        wait.current = true;
    }, []);

    useEffect(() => {
        if (sec.current) return;
        const total = cartData.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [cartData]);

    const handleQty = async (action, index, id, size) => {
        const newQty = [...cartData];
        if (action === "p") {
            newQty[index].qty += 1;
        } else if (action === "m" && cartData[index].qty > 1) {
            newQty[index].qty -= 1;
        } else {
            return;
        }

        newQty[index].price = newQty[index].qty * newQty[index].product.price;

        await fetch('/api/shopping-bag', {
            method: "PATCH",
            body: JSON.stringify({
                productId: id,
                productSize: size,
                newQty: newQty[index].qty,
                price: cartData[index].product.price
            })
        });

        setCartData(newQty);
    };

    const handleRemoveItem = async (id, size) => {
        await fetch('/api/shopping-bag', {
            method: "DELETE",
            body: JSON.stringify({ productId: id, productSize: size })
        });
        fetchCartData();
    };

    return (
        <div>
            {!loading ? (
                cartData.length > 0 ? (
                    <div className='mx-10 max-480:mx-2 min-481-max-834:mx-4 select-none	'>
                        <div>
                            <div className='flex my-4'>
                                <p className='w-4/12 max-480:w-4/12 min-481-max-834:w-6/12'>Product</p>
                                <p className='w-1/12 max-480:w-2/12 min-481-max-834:hidden'>Color</p>
                                <p className='w-1/12 max-480:w-2/12 max-480:text-center min-481-max-834:w-2/12 min-481-max-834:text-center'>Size</p>
                                <p className='w-4/12 text-center max-480:w-2/12 min-481-max-834:w-2/12'>Qty</p>
                                <p className='mr-4 w-2/12 text-right max-480:w-2/12 min-481-max-834:w-2/12'>Price</p>
                            </div>
                            {cartData.map((item, index) => (
                                <div key={item.product._id + item.size} className={`border-2 border-black flex items-center ${index > 0 && "border-t-0"} max-480:h-[30vh]`}>
                                    <div className='flex items-center w-4/12 max-480:w-4/12 min-481-max-834:w-6/12'>
                                        <img
                                            src={item.product.images[0]}
                                            alt="Product image"
                                            width={100}
                                            height={100}
                                            className='border-r-2 border-black max-w-[24vw] max-h-[29.4vh]'
                                            loading="lazy"
                                        />
                                        <h2 className='mx-4 font-medium max-480:text-center max-480:hidden'>{item.product.title}</h2>
                                    </div>
                                    <div className='w-1/12 max-480:w-2/12 min-481-max-834:hidden'>
                                        <h2 className='font-medium'>{item.product.color}</h2>
                                    </div>
                                    <div className='w-1/12 font-medium max-480:w-2/12 max-480:text-center min-481-max-834:w-2/12 min-481-max-834:flex min-481-max-834:justify-center'>
                                        <h2>{item.size}</h2>
                                    </div>
                                    <div className='w-4/12 flex justify-center items-center max-480:flex-col max-480:w-2/12 min-481-max-834:flex-col min-481-max-834:w-2/12'>
                                        <p className='hover:cursor-pointer' onClick={() => handleQty("m", index, item.product._id, item.size)}>
                                        <Minus size={20} />
                                        </p>
                                        <h2 className='m-4 select-none'>{item.qty}</h2>
                                        <p className='hover:cursor-pointer' onClick={() => handleQty("p", index, item.product._id, item.size)}>
                                        <Plus size={20} />
                                        </p>
                                        <button className='mx-6 font-medium select-none	' onClick={() => handleRemoveItem(item.product._id, item.size)}>Remove</button>
                                    </div>
                                    <div className='mr-4 w-2/12 text-right max-480:mr-2 max-480:w-2/12 min-481-max-834:w-2/12 select-none	'>
                                        <h2>{item.product.price} $</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SubtotalCart totalPrice={totalPrice} />
                        <ButtonsCart totalPrice={totalPrice} />
                    </div>
                ) : <p className='text-center p-10'>No items found in the shopping bag.</p>
            ) : <ShoppingBagLoadSkeleton />}
        </div>
    );
};

export default CartProducts;

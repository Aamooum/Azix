const AddToShoppingBagBtn = ({outStock,product,size}) => {
    const handleCartData = async () => {
        await fetch('/api/shopping-bag', {
          method: "POST",
          body: JSON.stringify({
            product: product._id,
            qty: 1,
            size: size,
            price: product.price
          })
        });
      };
  return (
    <button
    onClick={handleCartData}
    className={`w-full h-12 border border-black text-lg ${!outStock ? "bg-black text-white hover:bg-white hover:text-black" : "bg-slate-300"} my-3`}
    disabled={outStock}
    >
    ADD TO SHOPPING BAG
    </button>
  )
}

export default AddToShoppingBagBtn
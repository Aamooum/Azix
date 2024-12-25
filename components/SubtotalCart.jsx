const SubtotalCart = ({ totalPrice }) => {
  return (
    <div className='text-xl font-semibold flex justify-end gap-20 my-8 mx-2'>
      <p>Subtotal</p>
      <h3>{totalPrice} $</h3>
    </div>
  );
};

export default SubtotalCart;

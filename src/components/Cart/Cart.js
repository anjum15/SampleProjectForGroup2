import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import React, { useContext, useState } from 'react';
import CartContext from './CartContext';
import CartItem from './CartItem';
import CheckoutCart from './CheckoutCart';


const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCnxt = useContext(CartContext);

const totalAmount = `₹${cartCnxt.totalAmount.toFixed(2)}`;
const containsItem = cartCnxt.items.length > 0;

const cartItemRemoveHandler = (id) => {
  cartCnxt.removeItem(id);
};

const cartItemAddHandler = (item) => {
   cartCnxt.addItem({...item, amount:1});
};

const orderHandler = () => {
  setIsCheckout(true);
};

const submitOrderHandler = async (userData) => {
  setIsSubmitting(true);
  await fetch('https://food-order-app-15400-default-rtdb.firebaseio.com/orders.json', {
    method: 'POST',
    body: JSON.stringify({

      orderedItems: cartCnxt.items
    })
  });
setIsSubmitting(false);
setDidSubmit(true);
cartCnxt.clearCart();
};

        const cartItems = (
          <ul className={classes['cart-items']}>
            {cartCnxt.items.map((item) => (
              <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </ul>
        );

        const modalActions = (
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {containsItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
        );

        const cartModalContent =
         <React.Fragment>
           {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
            {isCheckout && <CheckoutCart onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
           
        </React.Fragment>

        const isSubmittingModalContent = <p>sending the order data!!</p>

        const didSubmitModalContent = 
        <React.Fragment>
          <p>Order successful!!!!</p>
          <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
          </React.Fragment>
    return(
        <Modal onClose={props.onClose}>
           {!isSubmitting && !didSubmit && cartModalContent}
           {isSubmitting && isSubmittingModalContent}
           {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
    };
export default Cart;
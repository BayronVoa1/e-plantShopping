import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => { //TAREA 3.1
    let costoTotal=0;
    for(let i = 0; i<cart.length;i++){
      costoTotal += parseInt(cart[i].cost.slice(1),10) * cart[i].quantity;
    }
    return costoTotal;
  };



  const handleContinueShopping = (e) => {
    onContinueShopping(e);//TAREA3.2
  };



  const handleIncrement = (item) => {
    const updatedItem = {//TAREA 3.4
      ...item,  
      quantity: item.quantity + 1  
    };
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    if(item.quantity-1 > 0){
      const updatedItem = {
        ...item,  //TAREA 3.4
        quantity: item.quantity - 1  
      };
      dispatch(updateQuantity(updatedItem));
    }
    else{
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));//TAREA 3.5
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * parseInt(item.cost.slice(1),10);//TAREA 3.6
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;



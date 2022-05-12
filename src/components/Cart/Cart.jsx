import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../Store/Cart-Context';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

// props.onclose is to close the cart
const Cart = props => {

    // use hooks to set state
    const [isCheckOut, setIscCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    //set the functions for adding, deleting and order items in cart
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemDeleteHandler = (id) => {
        cartCtx.deleteItem(id)
    }

    const orderHandler = () => {
        setIscCheckOut(true);
    }

    const backToOrder = () => {
        setIscCheckOut(false)
    }

    // send the order data to server
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://react-http-6900e-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items,
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    // catch all the cartitems and show on screen
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onDelete={cartItemDeleteHandler.bind(null,item.id)}
                />))}
        </ul>
    );

    // the buttons in cart page
    const modalActions = (
        <div className={classes.actions} >
            <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    // all the content of the cart
    const cartModalContent = (
        <React.Fragment>
            {!isCheckOut && cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {isCheckOut && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} onBack={backToOrder} />}

            {!isCheckOut && modalActions}
        </React.Fragment>
    );

    // the page when loading the data or successfully submitted the data
    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (<React.Fragment>
        <div className={classes.success}>
            <p>Successfully sent the order!</p>
            <h5><span>Order Number:</span> NO00000001</h5>
            <h5><span>Estimate Time:</span> 15 minutes</h5>
        </div>

        <div className={classes.actions} >
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>);

    return (
        // Modal is the UI to let cart overlay on the page
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;
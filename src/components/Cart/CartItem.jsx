import classes from './CartItem.module.css';

// to edit the amount of each food in cart
const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>

      <div >
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
        <div className={classes.delete}>
          <button onClick={props.onDelete}><img src="https://img.icons8.com/material-sharp/24/000000/delete-forever.png" alt='Delete'/></button>
        </div>
        
      </div>
    </li>
  );
};

export default CartItem;

import { Fragment, useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './Store/CartProvider';

function App() {
  //whether the cart is shown
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <CartProvider >
      {/* when the cartishown equal to true, the cart will be shown */}
      {cartIsShown && <Cart onClose={hideCartHandler}/>}

      {/* showcarthandler link to Header component */}
      <Header onShowCart={showCartHandler}/> 
      
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

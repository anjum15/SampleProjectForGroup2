import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../Cart/CartContext';

const HeaderCartButton = (props) => {
    const [buttonHighlight, setButtonHighlight] = useState(false);
    const cartCnxt = useContext(CartContext);

    const {items} = cartCnxt;

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return(
            currentNumber + item.amount
        );
    }, 0);


    const btnAnimationClasses = `${classes.button} ${buttonHighlight ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setButtonHighlight(true);

      const timer =  setTimeout(() => {
            setButtonHighlight(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items] );
    
return (
    <button className={btnAnimationClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
)
};

export default HeaderCartButton;
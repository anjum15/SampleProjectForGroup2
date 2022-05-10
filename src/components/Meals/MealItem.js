import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../Cart/CartContext';


const MealItem = props => {
    const cartCnxt = useContext(CartContext);

const price = `₹${props.price.toFixed(2)}`;

const addItemToCartHandler = amount => {
    cartCnxt.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
    });
};

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
                </div>
            <div>
                <MealItemForm onAddToCart={addItemToCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;
import { Fragment, useState } from "react";
import mealsImage from '../../assests/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
import OrderHistory from './OrderHistory';


const Header = props => {
    const [showHistory, setShowHistory] = useState(true);
    return <Fragment>
        <header className={classes.header}>
            <h1>Anjum's FoodOrderApp</h1>
          <HeaderCartButton onClick={props.onShowCart}/>
            {showHistory &&  <OrderHistory className={classes.button} setShowHistory={setShowHistory}/>}

        </header>
        <div className={classes['hero-image']}>
            <img src={mealsImage} alt='A table full of delicious food!'/>
        </div>
        </Fragment>
};

export default Header;
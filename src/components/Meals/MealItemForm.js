import classes from './MealItemForm.module.css';
import Input from '../UI/Input';
import {useRef, useState} from 'react';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    
    const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;


    if(enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5)
     {
         setAmountIsValid(false);
        return ;
    }

    props.onAddToCart(enteredAmountNum);
};

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
            ref={amountInputRef}
             label="Amount"
             input={{
                id:'amount_',
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'0',
            }} 
            />
            <button>Add</button>
            {!amountIsValid && <p>Please enter a amount from 1-5</p>}
        </form>
    );
};

export default MealItemForm;
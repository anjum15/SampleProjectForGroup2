import React, { useState } from "react";
import { useRef } from "react";
import classes from './CheckoutCart.module.css';

const isEmpty = value => value.trim() === '';
const isCorrectPin = value => value.trim().length === 6;

const CheckoutCart = props => {

    const [formInputIsValid, setFormInputIsValid] = useState({
        name: true,
        address: true,
        pin: true,
        phone: true

    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const pinInputRef = useRef();
    const phoneInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddresss = addressInputRef.current.value;
        const enteredPin = pinInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddresssIsValid = !isEmpty(enteredAddresss);
        const enteredPinIsValid = isCorrectPin(enteredPin);
        const enteredPhoneIsValid = !isEmpty(enteredPhone);

        setFormInputIsValid({
            name:enteredNameIsValid,
            address:enteredAddresssIsValid,
            pin:enteredPinIsValid,
            phone:enteredPhoneIsValid
        });

        const formIsValid =
        enteredNameIsValid
        && enteredAddresssIsValid
        && enteredPinIsValid
        && enteredPhoneIsValid;


        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddresss,
            pin: enteredPin,
            phone: enteredPhone
        });
    };

    const nameControl = `${classes.control} ${formInputIsValid.name?'':classes.invalid}`;
    const addressControl = `${classes.control} ${formInputIsValid.address?'':classes.invalid}`;
    const pinControl = `${classes.control} ${formInputIsValid.pin?'':classes.invalid}`;
    const phoneControl = `${classes.control} ${formInputIsValid.phone?'':classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControl}>
                <label htmlFor='name'>Name</label>
                <input type='text' id="name" ref={nameInputRef}/>
                {!formInputIsValid.name && <p>Enter a valid name</p>}
            </div>
            <div className={addressControl}>
                <label htmlFor='address'>Address</label>
                <input type='text' id="address" ref={addressInputRef} />
                {!formInputIsValid.address && <p>Enter a valid address</p>}
            </div>
            <div className={pinControl}>
                <label htmlFor='pin'>Pin Code</label>
                <input type='text' id="pin" ref={pinInputRef} />
                {!formInputIsValid.pin && <p>Enter a valid pin code</p>}
            </div>
            <div className={phoneControl}>
                <label htmlFor='phone'>Phone Number</label>
                <input type='text' id="phone" ref={phoneInputRef}/>
                {!formInputIsValid.phone && <p>Enter a valid phone number</p>}
            </div>
            <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default CheckoutCart;
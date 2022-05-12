import classes from './CheckOut.module.css'
import { useState } from 'react';
import useInput from '../../hooks/useInput';

const isEmpty = value => value.trim() !== ''
const isNotFiveChars = value => value.trim().length === 5;

const CheckOut = (props) => {
    const {
        value: enteredName,
        hasError: nameInputHasError,
        isValid: enteredNameIsValid,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(isEmpty);

    const {
        value: enteredStreet,
        hasError: streetInputHasError,
        isValid: enteredStreetIsValid,
        valueChangeHandler: streetChangedHandler,
        inputBlurHandler: streetBlurHandler,
        reset: resetStreetInput
    } = useInput(isEmpty);

    const {
        value: enteredPostal,
        hasError: postalInputHasError,
        isValid: enteredPostalIsValid,
        valueChangeHandler: postalChangedHandler,
        inputBlurHandler: postalBlurHandler,
        reset: resetPostalInput
    } = useInput(isNotFiveChars);

    const {
        value: enteredPhoneNum,
        hasError: phoneNumInputHasError,
        isValid: enteredPhoneNumIsValid,
        valueChangeHandler: phoneNumChangedHandler,
        inputBlurHandler: phoneNumBlurHandler,
        reset: resetPhoneNumInput
    } = useInput(isEmpty);

    const {
        value: enteredEmail,
        reset: resetEmailInput
    } = useInput(isEmpty);

    let formIsValid = false;

    if(
        enteredNameIsValid &&
        enteredStreetIsValid &&
        enteredPostalIsValid &&
        enteredPhoneNumIsValid
    ) {
        formIsValid = true;
    };
    
    const confirmHandler = (event) => {
        event.preventDefault();

        resetNameInput();
        resetStreetInput();
        resetEmailInput();
        resetPostalInput();
        resetPhoneNumInput();

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            email: enteredEmail,
            postalCode: enteredPostal,
            phoneNumber: enteredPhoneNum
        });
    }

    const nameControlClasses = `${classes.control} ${!nameInputHasError ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${!streetInputHasError ? '' : classes.invalid}`
    const postalControlClasses = `${classes.control} ${!postalInputHasError ? '' : classes.invalid}`
    const phoneNumControlClasses = `${classes.control} ${!phoneNumInputHasError ? '' : classes.invalid}`

    return (
        <div>
            <form className={classes.form}>
                <div className={nameControlClasses}>
                    <label htmlFor='name'>Your Name* {nameInputHasError && <span> (Required)</span>}</label>

                    <input type='text'
                        id='name'
                        value={enteredName}
                        onBlur={nameBlurHandler}
                        onChange={nameChangedHandler}></input>
                </div>

                <div className={phoneNumControlClasses}>
                    <label htmlFor='phone'>Phone Number* {phoneNumInputHasError && <span> (Required)</span>}</label>
                    <input type='tel'
                        id='phone'
                        value={enteredPhoneNum}
                        onBlur={phoneNumBlurHandler}
                        onChange={phoneNumChangedHandler}></input>
                </div>

                <div className={streetControlClasses}>
                    <label htmlFor='street'>Address* {streetInputHasError && <span> (Required)</span>}</label>
                    <input type='text'
                        id='street'
                        value={enteredStreet}
                        onBlur={streetBlurHandler}
                        onChange={streetChangedHandler}></input>
                </div>

                <div className={postalControlClasses}>
                    <label htmlFor='postal'>Postal Code* {postalInputHasError && <span> (Reqiured 5 numbers)</span>}</label>
                    <input type='text'
                        id='postal'
                        value={enteredPostal}
                        onBlur={postalBlurHandler}
                        onChange={postalChangedHandler}></input>
                </div>

                <div className={classes.control}>
                    <label htmlFor='email'>Email(optional)</label>
                    <input type='email'
                        id='email'
                        value={enteredEmail}></input>
                </div>

            </form>

            <div className={classes.actions}>
                <button type='button' onClick={props.onBack} className={classes.but}>Back</button>

                <div>
                    <button type='button' onClick={props.onCancel} className={classes.but}>Cancel</button>
                    <button disabled={!formIsValid} className={classes.submit} onClick={confirmHandler} >Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default CheckOut;


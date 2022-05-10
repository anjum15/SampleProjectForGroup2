import { Fragment } from 'react';
import classes from './Modal.module.css';

// import ReactDOM  from 'react-dom';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}>
        </div>
    );
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

// const portalMethod = document.getElementById("overlays");


const Modal = props => {
    return (
        <Fragment>
           <Backdrop onClose={props.onClose} />
            <ModalOverlay>{props.children}</ModalOverlay>
        </Fragment>

    // return(
    //     <Fragment>
    //         {ReactDOM.createPortal(<Backdrop />, portalMethod)}
    //        { ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalMethod)}
    //     </Fragment>
    );
};

export default Modal;
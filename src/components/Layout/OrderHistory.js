import React from "react";
import classes from './OrderHistory.module.css'
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";


const OrderHistory = (props) => {
const [OrderHistoryDisplay, setOrderHistoryDisplay] = useState(false);
       

    return (
        <React.Fragment>
            <button className={classes.button} onClick={()=>setOrderHistoryDisplay(true)}>Order History</button>
            {OrderHistoryDisplay && <HistoryModal setOrderHistoryDisplay={setOrderHistoryDisplay}/>}
        {/* <Modal>
            <button onClick={()=>props.setShowHistory(false)}>close</button>
        </Modal> */}
        </React.Fragment>
    );
};

const HistoryModal = (props) =>{
    const [historyItems, setOrder] = useState([]);
    const fetchHistory = async() =>{
        const response = await fetch("https://food-order-app-15400-default-rtdb.firebaseio.com/orders.json");
        const data =await response.json();
        for(let key in data){
            console.log(data[key].orderedItems);
        }
    }
    
    useEffect(()=>{
        fetchHistory();
    }, []);
  
    return <Modal>

        <button onClick={()=> props.setOrderHistoryDisplay(false)}>close</button>
    </Modal>
}

export default OrderHistory;
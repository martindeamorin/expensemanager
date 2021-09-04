import React from "react";

export default function BalanceDisplay(props){
    return(
        <div className="balanceContainer" style={props.style}>
            <span>{props.text}</span>   
            <span className="totalText">${props.total}</span> 
        </div>
        
    )
}
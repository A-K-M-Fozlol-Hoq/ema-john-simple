import React from 'react';

const ReviewItem = ( props ) => {
    const { name, quantity, key }= props.product;
    const reviewStyle ={
        borderBottom : '1px solid lightgray',
        marginBottom : '6px',
        paddingBottom : '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewStyle}>
            <h4 className="product-name">Product name : {name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <button 
            className="main-button"
            onClick ={()=> props.removeProduct(key)}
            >Remove</button>
            
        </div>
    );
};

export default ReviewItem;
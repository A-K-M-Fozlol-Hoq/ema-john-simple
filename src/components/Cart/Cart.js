import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart)
    // const total = cart.reduce((total, prd) => total+prd.price,0)
    
    let total= 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total= total+product.price*product.quantity;
        console.log(product)
        
    }
    let shipping=0;
    if(total>200){
        shipping= 0;
    }
    else if(total>150){
        shipping=5;
    }
    else if(total>100){
        shipping=10;
    }
    else if(total>50){
        shipping=15;
    }
    else if(total>0){
        shipping=18;
    }
    let vat = (total/10).toFixed(2);
    const grandTotal=(total + shipping +Number(vat)).toFixed(2);

    const formatNumber = num =>{
        const precision = (num).toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h1>Order summery</h1>
            <h5>Items Ordered: {cart.length}</h5>
            <h5>Product Price  : {formatNumber(total)}$</h5>
            <h5><small>Shipping Cost : {shipping}$</small></h5>
            <h5><small>VAT + Tax : {vat}$  </small></h5>
            <h5>Total Price  : {grandTotal}$</h5> <br></br>
            <br/>
            {
                props.children
            }
            {/* <Link */}
        </div>
    );
};

export default Cart;
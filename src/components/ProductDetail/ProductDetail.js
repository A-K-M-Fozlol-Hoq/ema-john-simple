import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData/index';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [ product, setProduct ] = useState({})
    useState(()=>{
        fetch('http://localhost:5000/product/'+productKey)
        .then(res => res.json())
        .then( data => setProduct(data))
    },[productKey])

    // const product = fakeData.find(pd => pd.key === productKey)

    return (
        <div>
            
            <h1>Your Product Details</h1>
            <Product 
            key={product.key}
            showAddToCart ={false}
            product={product}></Product>
        </div>
    );
};

export default ProductDetail;
import React, { Fragment } from 'react';
import { Link } from "react-router-dom"

import { Rating } from '@material-ui/lab';

const ProductCard = ({ product }) => {
    const options = {
        // edit: false,
        // color: "rgba(20,20,20,0.1)",
        // activeColor: "tomato",
        // size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <Fragment>
            <Link className='productCard' to={`/product/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div >
                    <Rating {...options} /><span className='productCardSpan'>{product.numOfReviews}(reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </Link>
        </Fragment>

    );
};

export default ProductCard;

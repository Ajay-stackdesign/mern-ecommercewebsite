import React from 'react';
import { Typography } from '@material-ui/core';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css"
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className='orderSuccess'>
            <CheckCircleIcon />
            <Typography>Your Order has been Placed SuccessFully</Typography>
            <Link to="/orders">View Orders</Link>
        </div>


    );
};

export default OrderSuccess;

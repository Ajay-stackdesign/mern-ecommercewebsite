import React, { useEffect } from 'react';
import "./Dashboard.css"
import Sidebar from "./Sidebar.js"
import Metadata from "../layout/Metadata"
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import Products from '../Product/Products';
import { Doughnut, Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderAction';

const Dashboard = () => {
    const dispatch = useDispatch()

    const { products } = useSelector((state) => state.products)

    const { orders } = useSelector((state) => state.allOrders)

    const { users } = useSelector((state) => state.allUsers)
    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });
    useEffect(() => {
        dispatch(getAdminProduct())
        dispatch(getAllOrders())
    }, [dispatch])

    let totalAmount = 0
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data: [0, totalAmount],
                // data: [0, 4000],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        dataSets: [
            {
                backgroundColor: ["#00A6B$", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock],
                // data: [2, 10],
            },
        ],
    };

    return (
        <div className='dashboard'>
            <Metadata title="Dashboard - Admin Panel" />
            <Sidebar />
            <div className='dashboardContainer'>
                <Typography component="h1">Dashboard</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>Total Amount
                            <br /> ₹{totalAmount}
                            {/* <br /> ₹2000 */}
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                            {/* <p>50</p> */}
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                            {/* <p>4</p> */}
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                            {/* <p>2</p> */}
                        </Link>
                    </div>
                </div>

                <div className='lineChart'>
                    <Line data={lineState} />
                </div>

                <div className='doughtnutChart'>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
};

export default Dashboard;

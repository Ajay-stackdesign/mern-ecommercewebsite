// import React, { Fragment, useEffect } from 'react';
// import "./ProductList.css"
// import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { useAlert } from "react-alert"
// import MetaData from "../layout/Metadata"
// import Sidebar from "../Admin/Sidebar"
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { DataGrid } from "@material-ui/data-grid"
// import { Button } from '@material-ui/core';
// import { clearErrors, getAdminProduct } from '../../actions/productActions';

// const ProductList = () => {

//     const alert = useAlert()
//     const dispatch = useDispatch()

//     const { error, products } = useSelector((state) => state.products)

//     // // const {error: deleteError, isDeleted} = useSelector((state) => state.product)

//     // const columns = []
//     useEffect(() => {
//         if (error) {
//             alert.error(error)
//             dispatch(clearErrors)
//         }

//         dispatch(getAdminProduct())
//     })
//     const columns = [
//         { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

//         {
//             field: "name",
//             headerName: "Name",
//             minWidth: 350,
//             flex: 1,
//         },
//         {
//             field: "stock",
//             headerName: "Stock",
//             type: "number",
//             minWidth: 150,
//             flex: 0.3,
//         },

//         {
//             field: "price",
//             headerName: "Price",
//             type: "number",
//             minWidth: 270,
//             flex: 0.5,
//         },

//         {
//             field: "actions",
//             flex: 0.3,
//             headerName: "Actions",
//             minWidth: 150,
//             type: "number",
//             sortable: false,
//             renderCell: (params) => {
//                 return (
//                     <Fragment>
//                         <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
//                             <EditIcon />
//                         </Link>

//                         <Button
//                         //   onClick={() =>
//                         //     deleteProductHandler(params.getValue(params.id, "id"))
//                         //   }
//                         >
//                             <DeleteIcon />
//                         </Button>
//                     </Fragment>
//                 );
//             },
//         },
//     ];
//     const rows = []

//     products &&
//         products.forEach((item) => {
//             rows.push({
//                 id: item._id,
//                 stock: item.Stock,
//                 price: item.price,
//                 name: item.name,
//             })
//         })
//     return (
//         <Fragment>
//             <MetaData title={`ALL PRODUCTS - Admin`} />
//             <div className='dashboard'>
//                 <Sidebar />

//                 <div className='productListContainer'>
//                     <h1 id="productListHeading">ALL PRODUCTS</h1>

//                     <DataGrid rows={rows} columns={columns} pageSize={10}
//                         disableSelectionOnClick
//                         className="productListTable"
//                         autoHeight />
//                 </div>
//             </div>
//         </Fragment>
//     )
// };

// export default ProductList;

import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { getAdminProduct, clearErrors, deleteProduct } from "../../actions/productActions"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import Metadata from "../layout/Metadata"
// import Sidebar from "../Admin/Sidebar"
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productconstants';
// import { ALL_PRODUCT_REQUEST } from '../../constants/productconstants';

const ProductList = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, products } = useSelector((state) => state.products)

    const { error: deleteError, isDeleted } = useSelector((state) => state.product)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (deleteError) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Product Delete SuccessFully")
            history.push("/admin/dashboard")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProduct())
    }, [alert, deleteError, dispatch, error, history, isDeleted])
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },

    ]
    const rows = []

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            })
        })
    return (
        <Fragment>
            <Metadata title={"ALL Products -- Admin"} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
};

export default ProductList;


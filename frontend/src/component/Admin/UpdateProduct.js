// import React, { Fragment, useEffect, useState } from 'react'
// import { useAlert } from 'react-alert'
// import { useDispatch, useSelector } from 'react-redux'
// import Metadata from '../layout/Metadata'
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
// import StorageIcon from "@material-ui/icons/Storage";
// import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import Sidebar from './Sidebar'
// import { Button } from '@material-ui/core';
// import { clearErrors, getProductDetails, updateProduct } from '../../actions/productActions';
// import { UPDATE_PRODUCT_RESET } from '../../constants/productconstants';

// const UpdateProduct = ({ history, match }) => {
//     const dispatch = useDispatch()
//     const alert = useAlert()

//     const { error, product } = useSelector((state) => state.productDetails)


//     const { loading, error: updateError,
//         isUpdated } = useSelector((state) => state.product)

//     const [name, setName] = useState("")
//     const [price, setPrice] = useState(0)
//     const [description, setDescription] = useState('')
//     const [category, setCategory] = useState("")
//     const [Stock, setStock] = useState(0)
//     const [images, setImages] = useState([])
//     const [oldImages, setOldImages] = useState([])
//     const [imagesPreview, setImagesPreview] = useState([])

//     const categories = [
//         "Laptop",
//         "Footwear",
//         "Bottom",
//         "Tops",
//         "Attire",
//         "Camera",
//         "SmartPhones",
//     ]

//     const productId = match.params.id

//     useEffect(() => {
//         if (product && product._id !== productId) {
//             dispatch(getProductDetails(productId))
//         }

//         if (error) {
//             alert.error(error)
//             dispatch(clearErrors())
//         }
//         if (updateError) {
//             alert.error(updateError)
//             dispatch(clearErrors())
//         }

//         if (isUpdated) {
//             alert.success("Product Updated SuccessFully")
//             history.push("/admin/products")
//             dispatch({ type: UPDATE_PRODUCT_RESET })
//         }
//     }, [alert, dispatch, error, history, isUpdated, product, productId, updateError])

//     const updateProductSubmitHandler = (e) => {
//         e.preventDefault()

//         const myForm = new FormData()

//         myForm.set("name", name)
//         myForm.set("price", price)
//         myForm.set("description", description)
//         myForm.set("category", category)
//         myForm.set("Stock", Stock)

//         images.forEach((image) => {
//             myForm.append("images", image)
//         })
//         dispatch(updateProduct(productId, myForm))
//     }

//     const updateProductImagesChange = (e) => {
//         const files = Array.from(e.target.files);

//         setImages([]);
//         setImagesPreview([]);
//         setOldImages([]);

//         files.forEach((file) => {
//             const reader = new FileReader();

//             reader.onload = () => {
//                 if (reader.readyState === 2) {
//                     setImagesPreview((old) => [...old, reader.result]);
//                     setImages((old) => [...old, reader.result]);
//                 }
//             };

//             reader.readAsDataURL(file);
//         });
//     }

//     return (
//         <Fragment>
//             <Metadata title="UPDATE PRODUCT" />
//             <div className='dashboard'>
//                 <Sidebar />
//                 <div className='newProductContainer'>
//                     <form className='createProductForm' encType='multipart/form-data'
//                         onSubmit={updateProductSubmitHandler}
//                     >
//                         <h1>Create Product</h1>
//                         <div>
//                             <SpellcheckIcon />
//                             <input type="text" placeholder='Product Name'
//                                 required value={name} onChange={(e) => setName(e.target.value)} />
//                         </div>
//                         <div>
//                             <AttachMoneyIcon />
//                             <input type="number" placeholder='Price' required
//                                 onChange={(e) => setPrice(e.target.value)}
//                                 value={price} />
//                         </div>
//                         <div>
//                             <DescriptionIcon />

//                             <textarea
//                                 placeholder="Product Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 cols="30"
//                                 rows="1"
//                             ></textarea>
//                         </div>
//                         <div>
//                             <AccountTreeIcon />
//                             <select
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                             >
//                                 <option value="">Choose Category</option>
//                                 {categories.map((cate) => (
//                                     <option key={cate} value={cate}>
//                                         {cate}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <StorageIcon />
//                             <input
//                                 type="number"
//                                 placeholder="Stock"
//                                 required
//                                 onChange={(e) => setStock(e.target.value)}
//                                 value={Stock}
//                             />
//                         </div>

//                         <div id="createProductFormFile">
//                             <input
//                                 type="file"
//                                 name="avatar"
//                                 accept="image/*"
//                                 onChange={updateProductImagesChange}
//                                 multiple
//                             />
//                         </div>
//                         <div id="createProductFormImagess">
//                             {oldImages &&
//                                 oldImages.map((image, index) => (
//                                     <img key={index} src={image.url} alt="Old Product Preview" />
//                                 ))
//                             }
//                         </div>
//                         <div id="createProductFormImage">
//                             {imagesPreview.map((image, index) => {
//                                 <img key={index} src={image} alt="Product Preview" />
//                             })}
//                         </div>
//                         <Button id="createProductBtn"
//                             type="submit" disabled={loading ? true : false} >
//                             Create
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default UpdateProduct

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    updateProduct,
    getProductDetails,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metadata from "../layout/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productconstants";

const UpdateProduct = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, product } = useSelector((state) => state.productDetails);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const productId = match.params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            history.push("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [
        dispatch,
        alert,
        error,
        history,
        isUpdated,
        productId,
        product,
        updateError,
    ]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <Metadata title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;

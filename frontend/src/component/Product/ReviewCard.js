import React from 'react';

import profilePng from "../../images/Profile.png"
import { Rating } from "@material-ui/lab"


const ReviewCard = ({ review }) => {
    // const options = {
    //     edit: false,
    //     color: "rgba(20,20,20,0.1)",
    //     activeColor: "tomato",
    //     size: window.innerWidth < 600 ? 20 : 25,
    //     value: review.ratings,
    //     isHalf: true,
    // }
    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    return <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
    </div>;
};

export default ReviewCard;

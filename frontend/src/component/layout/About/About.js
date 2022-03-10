import React from "react";
import "./About.css";
import { Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import ajay from "../../../images/ajay.jpg"




const About = () => {
    // const visitInstagram = () => {
    //     window.location = "https://instagram.com/meabhisingh";
    // };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Me</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src={ajay}
                            alt="Founder"
                        />
                        <Typography>AjayKumar Sahni</Typography>
                        {/* <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button> */}
                        <span>
                            This projects is all about Ecommerce and Build using Mern Stack Technology.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Find Me!</Typography>
                        <a
                            href="https://www.linkedin.com/in/ajay-sahani-95736b1a5/"
                            target="blank"
                        >
                            <LinkedInIcon className="linkedinSvgIcon" />
                        </a>

                        {/* <a href="https://github.com/Ajay-stackdesign" target="blank">
                            <GitHubIcon className="instagramSvgIcon" />
                        </a> */}
                        {/* <a href="https://github.com/Ajay-stackdesign" target="blank">
                            <HackerRankIcon className="instagramSvgIcon" />
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
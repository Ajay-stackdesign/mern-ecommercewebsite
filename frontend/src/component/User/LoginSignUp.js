import React, { Fragment, useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import Loader from '../layout/Loader/Loader';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from "react-router-dom"
import "./LoginSignUp.css"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from "../../actions/userAction"
import Loader from '../layout/Loader/Loader';
import Google from "../../images/facebook.png"
import Github from "../../images/github.png"
import Facebook from "../../images/google.png"


const LoginSignUp = ({ history, location }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, isAuthenticated } = useSelector((state) => state.user)
    const [loginPassword, setLoginPassword] = useState("")
    const [loginEmail, setLoginEmail] = useState("")
    // const { loading } = useSelector()
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState("/Profile.png")
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    };

    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/account";
    console.log(redirect)
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            history.push(redirect)
        }
    }, [alert, dispatch, error, history, isAuthenticated, redirect])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    const google = () => {
        // window.open("http://localhost:8003/auth/google", "_self");
    }

    const facebook = () => {
        // window.open("http://localhost:8003/auth/google", "_self");
    }

    const github = () => {
        // window.open("http://localhost:8003/auth/google", "_self");
    }


    return (
        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <div className='LoginSignUpContainer'>
                    <div className='LoginSignUpBox'>
                        <div>
                            <div className='login_signUp_toggle'>
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <MailOutlineIcon />
                                <input type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                        </form>
                        <form className='signUpForm' ref={registerTab}
                            encType='multipart/form-data'
                            onSubmit={registerSubmit}
                        >
                            <div className="signUpName">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="register" className="signUpBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>)}
            <div className="login">
                <hr></hr>
                <h3 className="loginTitle">Choose a Login Method</h3>
                <div className="wrapper">
                    <div className="left">
                        <div className="loginButton Google" onClick={google}>
                            <img src={Google} alt="" className="icon" />
                            Google
                        </div>
                        <div className="loginButton Facebook" onClick={facebook}>
                            <img src={Facebook} alt="" className="icon" />
                            Facebook
                        </div>
                        <div className="loginButton Github" onClick={github}>
                            <img src={Github} alt="" className="icon" />
                            Github
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default LoginSignUp;

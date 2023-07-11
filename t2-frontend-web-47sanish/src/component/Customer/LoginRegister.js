import React, { Fragment, useRef, useState, useEffect } from 'react'
import "./LoginRegister.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face"
import { Link, useNavigate } from "react-router-dom";
import Loader from '../layout/Loading/loading';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import { BsBackspaceFill } from "react-icons/bs";
import Navbar from '../navbar/Navbar';


const LoginRegister = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.user)

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("")
  const [success, setSucess] = useState(false)
  const [message, setMessage] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  }
  );
  const { name, email, password } = user;

  const showAlert = () => {
    setSucess(true);
    setMessage("Sucess true login")
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  }

  const registerSubmit = (e) => {

    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("password", password)
    dispatch(register(myForm))
  }
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {


    if (isAuthenticated) {
      navigate('/account');
    }
  }, [dispatch, error, navigate, isAuthenticated])
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
  };

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <div className='LoginRegisterContainer'>
          
          <div className='LoginRegisterBox'>
            <div>
              <div className='login_register_toogle'>





                <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
              </div>
              <button onClick={showAlert} ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className='loginEmail'>
                <MailOutlineIcon />
                <input
                  type="email"
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
                  placeholder='Password'
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/forget/password">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="registerForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="registerame">
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
              <div className="registerEmail">
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
              <div className="registerPassword">
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
              <input type="submit" value="Register" className="registerBtn" />
            </form>
          </div>
        </div>
        <ToastContainer />
      </Fragment>}
    </Fragment>
  )
}

export default LoginRegister

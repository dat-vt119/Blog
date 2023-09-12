import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import logo from "../img/logo-white.png";

import classes from "./Login.module.css";

const Login = () => {
  const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/homepage",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };
  return (
    <header className={classes.header}>
      <div className={classes["header__logo-box"]}>
        <img src={logo} alt="logo" className={classes["header__logo"]} />
      </div>
      <div className={classes["header__text-box"]}>
        <h1 className={classes["heading-primary"]}>
          <span className={classes["heading-primary--main"]}>Blog</span>
          <span className={classes["heading-primary--sub"]}>
            Is there life happens
          </span>
        </h1>
        <StyledFirebaseAuth
          className={`${classes.btn} ${classes["btn--animated"]}`}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </header>
  );
};

export default Login;

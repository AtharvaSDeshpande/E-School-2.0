// src/components/GoogleSignIn.jsx

import styles from "./Authenticate.module.css";
// import { useThemeQuery } from "../../hooks/useTheme";
// import { useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome/Welcome";

function SignIn() {
  //   const { theme } = useThemeQuery();
  //   const navigate = useNavigate();
  //   if (user) {
  //     navigate("/");
  //   }
  return (
    <div className={styles.signin}>
      <Welcome />

      <div className={styles.signinMessage}>
        Sign in now to unlock powerful tools that help you stay on track, crush
        your goals, and build a healthier lifestyle.
      </div>

      <div className={styles.signinButton}></div>
    </div>
  );
}

export default SignIn;

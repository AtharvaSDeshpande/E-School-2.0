// src/components/Login.tsx
import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import logo from "../../assets/images/eschoolLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

const AlertMessage: React.FC<{ message?: string | null }> = ({ message }) => {
  if (!message) return null;
  return <div className={styles.alert}>{message}</div>;
};

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const [forgot, setForgot] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [forgotEmail, setForgotEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    login,
    resetPassword,
    user,
    isUserLoading,
    isLoggingIn,
    isResettingPassword,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const togglePasswordVisibility = () => {
    setPasswordType(passwordHidden ? "text" : "password");
    setPasswordHidden(!passwordHidden);
  };

  const handleLogin = async (data: LoginForm) => {
    try {
      await login(data);
      setAlertMessage(null);
      navigate("/", { replace: true });
    } catch (error: any) {
      setAlertMessage(error.message || "Login failed");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setAlertMessage("Enter an Email ID");
      return;
    }
    try {
      const msg = await resetPassword(forgotEmail);
      setAlertMessage(msg || "Password reset email sent.");
      setForgotEmail("");
    } catch (error: any) {
      setAlertMessage(error.message || "Error sending reset email");
    }
  };

  useEffect(() => {
    if (!isUserLoading && user) {
      navigate("/", { replace: true });
    }
  }, [isUserLoading, user]);

  return (
    <div>
      <div className={styles.authContainer}>
        {!forgot ? (
          <form
            className={styles.authForm}
            onSubmit={handleSubmit(handleLogin)}
          >
            <img className={styles.auth_img} src={logo} alt="Logo" />
            <div className={styles.authHeader}>
              <h1>Login</h1> or{" "}
              <Link to="/createaccount" className={styles.authLink}>
                Create Account
              </Link>
            </div>

            <div className={styles.inputBlock}>
              <p className={styles.inputBlock__label}>
                <b>Email</b>
              </p>
              <input
                {...register("email", {
                  required: "Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={styles.inputBlock__input}
                type="email"
              />
              {errors.email && (
                <p className={styles.extraLabel}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.inputBlock}>
              <p className={styles.inputBlock__label}>
                <b>Password</b>
              </p>
              <div className={styles.passwordInputBox}>
                <input
                  {...register("password", {
                    required: "Required",
                    minLength: {
                      value: 8,
                      message: "Must be 8 characters or more",
                    },
                  })}
                  className={`${styles.inputBlock__input} ${styles.inputBlock__password}`}
                  type={passwordType}
                />
                <div
                  className={styles.inputBlock__input__button}
                  onClick={togglePasswordVisibility}
                >
                  {passwordHidden ? (
                    <VisibilityOff className={styles.icon} />
                  ) : (
                    <Visibility className={styles.icon} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className={styles.extraLabel}>{errors.password.message}</p>
              )}
            </div>

            <AlertMessage message={alertMessage} />

            <div className={styles.buttons}>
              <button
                type="submit"
                className={`${styles.authButton} ${styles.authButtonLogin}`}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
              <p className={styles.authLink} onClick={() => setForgot(true)}>
                Forgot password?
              </p>
            </div>
          </form>
        ) : (
          <form className={styles.authForm} onSubmit={handleResetPassword}>
            <img className={styles.auth_img} src={logo} alt="Logo" />
            <div className={styles.authHeader}>
              <h1>Reset Password</h1>
            </div>
            <div className={styles.inputBlock}>
              <p className={styles.inputBlock__label}>
                <b>Email</b>
              </p>
              <input
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className={styles.inputBlock__input}
                type="email"
              />
            </div>
            <AlertMessage message={alertMessage} />
            <div className={styles.buttons}>
              <button
                type="submit"
                className={`${styles.authButton} ${styles.authButtonLogin}`}
                disabled={isResettingPassword}
              >
                {isResettingPassword ? "Sending..." : "Send Reset Link"}
              </button>
              <p className={styles.authLink} onClick={() => setForgot(false)}>
                Back to login
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;

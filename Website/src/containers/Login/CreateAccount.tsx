// src/components/CreateAccount.tsx
import React, { useState } from "react";
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

interface CreateAccountForm {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

function CreateAccount() {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuth();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateAccountForm>();
  const password = watch("password");

  const handleSignup = async (data: CreateAccountForm) => {
    if (data.password !== data.confirmPassword) {
      setAlertMessage("Passwords must match");
      return;
    }
    try {
      await signup({ email: data.email, password: data.password });
      setAlertMessage("Verification email sent. Please verify your account.");
      navigate("/");
    } catch (error: any) {
      setAlertMessage(error.message || "Signup failed");
    }
  };

  return (
    <>
      <div className={styles.authContainer}>
        <form className={styles.authForm} onSubmit={handleSubmit(handleSignup)}>
          <img className={styles.auth_img} src={logo} alt="Logo" />
          <div className={styles.authHeader}>
            <h1>Create Account</h1> or{" "}
            <Link to="/login" className={styles.authLink}>
              Login
            </Link>
          </div>

          <Link to="/orgsignup" className={styles.orglink}>
            <p>Click Here For Organization Signup</p>
          </Link>

          {/* fields */}
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__label}>
              <b>First Name</b>
            </p>
            <input
              {...register("firstname", {
                required: "Required",
                minLength: 3,
                maxLength: 20,
              })}
              className={`${styles.inputBlock__input}`}
              type="text"
            />
            {errors.firstname ? (
              <p className={styles.extraLabel}>{errors.firstname.message}</p>
            ) : (
              <p className={styles.hidden}></p>
            )}
          </div>

          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__label}>
              <b>Last Name</b>
            </p>
            <input
              {...register("lastname", {
                required: "Required",
                minLength: 3,
                maxLength: 20,
              })}
              className={`${styles.inputBlock__input}`}
              type="text"
            />
            {errors.lastname ? (
              <p className={styles.extraLabel}>{errors.lastname.message}</p>
            ) : (
              <p className={styles.hidden}></p>
            )}
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
              className={`${styles.inputBlock__input}`}
              type="email"
            />
            {errors.email ? (
              <p className={styles.extraLabel}>{errors.email.message}</p>
            ) : (
              <p className={styles.hidden}></p>
            )}
          </div>

          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__label}>
              <b>Mobile</b>
            </p>
            <input
              {...register("mobile", {
                required: "Required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit mobile number",
                },
              })}
              className={`${styles.inputBlock__input}`}
              type="tel"
            />
            {errors.mobile ? (
              <p className={styles.extraLabel}>{errors.mobile.message}</p>
            ) : (
              <p className={styles.hidden}></p>
            )}
          </div>

          {/* password */}
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
                    message: "Must be at least 8 characters",
                  },
                })}
                className={`${styles.inputBlock__input} ${styles.inputBlock__password}`}
                type={passwordType}
              />
              <div
                className={styles.inputBlock__input__button}
                onClick={() =>
                  setPasswordType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
                }
              >
                {passwordType === "password" ? (
                  <VisibilityOff className={styles.icon} />
                ) : (
                  <Visibility className={styles.icon} />
                )}
              </div>
            </div>
            {errors.password ? (
              <p className={styles.extraLabel}>{errors.password.message}</p>
            ) : (
              <p className={styles.hidden}></p>
            )}
          </div>

          {/* confirm */}
          <div className={styles.inputBlock}>
            <p className={styles.inputBlock__label}>
              <b>Confirm Password</b>
            </p>
            <div className={styles.passwordInputBox}>
              <input
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (val) => val === password || "Passwords must match",
                })}
                className={`${styles.inputBlock__input} ${styles.inputBlock__password}`}
                type={confirmPasswordType}
              />
              <div
                className={styles.inputBlock__input__button}
                onClick={() =>
                  setConfirmPasswordType((prev) =>
                    prev === "password" ? "text" : "password"
                  )
                }
              >
                {confirmPasswordType === "password" ? (
                  <VisibilityOff className={styles.icon} />
                ) : (
                  <Visibility className={styles.icon} />
                )}
              </div>
            </div>
            {errors.confirmPassword ? (
              <p className={styles.extraLabel}>
                {errors.confirmPassword.message}
              </p>
            ) : (
              <p className={styles.hidden}></p>
            )}
          </div>

          <AlertMessage message={alertMessage} />

          <div className={styles.buttonsColumn}>
            <button
              type="submit"
              className={`${styles.authButton} ${styles.authButtonCreate}`}
              disabled={isSigningUp}
            >
              {isSigningUp ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;

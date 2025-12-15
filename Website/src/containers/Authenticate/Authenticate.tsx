import styles from "./Authenticate.module.css";
import logo from "../../assets/images/eschoolLogo.png";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { AuthBlockProps, AuthMode } from "../../data/Authenticate";

const Authenticate = () => {
  const sampleAuthBlockProps: AuthBlockProps = {
    mode: "signin",

    onSubmit: (data, mode: AuthMode) => {
      console.log(`Submitting ${mode} form:`, data);
    },

    fields: [],

    // Text customization
    title: "Welcome Back!",
    subtitle: "Please sign in to continue",
    submitButtonLabel: "Sign In",
    switchModeLabel: "Don’t have an account? Sign Up",
    onSwitchMode: (mode: AuthMode) => console.log("Switch mode to:", mode),

    // Visual customization
    className: "max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md",
    inputClassName: "border border-gray-300 rounded-md px-3 py-2 w-full",
    buttonClassName:
      "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md w-full",
    containerClassName: "flex flex-col gap-4",

    // State and feedback
    loading: false,
    errorMessage: "",
    successMessage: "",
    renderFooter: (mode) => (
      <p className="text-sm text-center text-gray-500 mt-2">
        {mode === "signin"
          ? "By signing in, you agree to our Terms & Privacy Policy."
          : "Creating an account means you agree to our Terms & Privacy Policy."}
      </p>
    ),
    onForgotPassword: () => console.log("Forgot password clicked"),

    // Accessibility / testing
    formId: "auth-form",
    testId: "auth-block",
  };

  return (
    <div className="auth">
      <img className={styles.authLogo} src={logo} alt="E-School" />
      <form className="authForm"></form>
    </div>
  );
};

export default Authenticate;

// src/pages/SampleAuth.tsx
import React, { useState } from "react";
import styles from "./SampleAuth.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function SampleAuth() {
  const {
    user,
    login,
    signup,
    logout,
    isLoggingIn,
    isSigningUp,
    isLoggingOut,
  } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignup) {
        await signup(form);
      } else {
        await login(form);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <h2>Welcome, {user.email}</h2>
        <button
          onClick={() => logout()}
          className={styles.logoutBtn}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className={styles.input}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          disabled={isLoggingIn || isSigningUp}
          className={styles.submitBtn}
        >
          {isSignup
            ? isSigningUp
              ? "Creating..."
              : "Sign Up"
            : isLoggingIn
            ? "Logging in..."
            : "Login"}
        </button>

        <p className={styles.toggle}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className={styles.link} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

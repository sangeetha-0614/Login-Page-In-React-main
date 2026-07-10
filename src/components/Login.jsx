import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();

  const defaultEmail = "admin@test.com";
  const defaultPassword = "Admin123";

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => {
    if (attempts >= 3) {
      setError("Account is locked after 3 failed attempts.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        email === defaultEmail &&
        password === defaultPassword
      ) {
        setError("");
        navigate("/welcome");
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
          setError(
            "Account is locked after 3 failed login attempts."
          );
        } else {
          setError(
            `Invalid email or password. Remaining attempts: ${
              3 - newAttempts
            }`
          );
        }
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login" />
      </div>

      <div className="login-right">
        <div className="login-right-container">

          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="login-center">

            <h2>Welcome Back!</h2>

            <p>Please enter your details</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />

              <div className="pass-input-div">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

                {showPassword ? (
                  <FaEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(true)}
                  />
                )}

              </div>

              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {error}
                </p>
              )}

              <div className="login-center-options">

                <div className="remember-div">
                  <input
                    type="checkbox"
                    id="remember-checkbox"
                  />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>

                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>

              </div>

              <div className="login-center-buttons">

                <button
                  type="submit"
                  disabled={!email || !password || loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>

                <button type="button">
                  <img src={GoogleSvg} alt="Google" />
                  Log In with Google
                </button>

              </div>

            </form>

            <div style={{ marginTop: "20px", color: "#555" }}>
              <strong>Demo Credentials</strong>
              <br />
              Email: admin@test.com
              <br />
              Password: Admin123
            </div>

          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="#">Sign Up</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
// LoginView.jsx
// Handles user authentication; redirects to Dashboard on successful login.

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// function LoginView() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     const success = login(username, password);
//     if (success) {
//       navigate("/dashboard");
//     } else {
//       setError("Invalid username or password");
//     }
//   }

//   return (
//     <div style={{ maxWidth: 300, margin: "100px auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         /><br /><br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         /><br /><br />
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//       <p style={{ fontSize: 12, color: "gray" }}>Hint: admin / admin123</p>
//     </div>
//   );
// }

// export default LoginView;



// LoginView.jsx
// Production-style login screen.
// Authentication logic remains in AuthContext.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import "./LoginView.css";
import { useAuth } from "../../context/AuthContext";

function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    // Simulate API delay.
    setTimeout(() => {
      const success = login(username.trim(), password);

      if (success) {
        navigate("/dashboard", { replace: true });
      } else {
        setError("Invalid username or password.");
        setIsLoading(false);
      }
    }, 500);
  }

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo / Brand */}
        <div className="login-brand">
          {/* <div className="brand-icon">EP</div> */}
          <span>Employee Portal</span>
        </div>

        {/* Header */}
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert("Please contact your administrator.")
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                disabled={isLoading}
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error" role="alert">
              <span>!</span>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Demo information */}
        <div className="demo-info">
          {/* <strong>Demo account</strong> */}
          {/* <span>Username: admin</span>
          <span>Password: admin123</span> */}
        </div>

        {/* Footer */}
        <div className="login-footer">
          {/* © 2026 Employee Portal */}
        </div>

      </div>
    </div>
  );
}

export default LoginView;


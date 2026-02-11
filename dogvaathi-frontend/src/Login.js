import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginType, setLoginType] = useState("USER"); // NEW
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    const endpoint = isLogin ? "login" : "signup";

    const bodyData = isLogin
      ? {
          email: email,
          password: password,
        }
      : {
          username: username,
          email: email,
          password: password,
          role: "USER", // Signup always USER
        };

    const response = await fetch(
      `http://localhost:8081/api/auth/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (isLogin && response.ok) {
      if (data.role === "ADMIN") {
        navigate("/admindash");
      } else if (data.role === "USER") {
        navigate("/home");
      }
    }


  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* 🔥 USER / ADMIN SWITCH */}
        {isLogin && (
          <div style={styles.roleSwitch}>
            <button
              style={loginType === "USER" ? styles.activeBtn : styles.roleBtn}
              onClick={() => setLoginType("USER")}
            >
              User
            </button>
            <button
              style={loginType === "ADMIN" ? styles.activeBtn : styles.roleBtn}
              onClick={() => setLoginType("ADMIN")}
            >
              Admin
            </button>
          </div>
        )}

        <h2>
          {isLogin
            ? `${loginType} Login`
            : "Sign Up"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p style={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            style={styles.switchLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  switchText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  switchLink: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
    cursor: "pointer"
  },
  roleSwitch: {
    display: "flex",
    marginBottom: "15px",
  },

  roleBtn: {
    flex: 1,
    padding: "8px",
    border: "1px solid #007bff",
    background: "white",
    cursor: "pointer",
  },

  activeBtn: {
    flex: 1,
    padding: "8px",
    border: "1px solid #007bff",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },

};

export default Login;

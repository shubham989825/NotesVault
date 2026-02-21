import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form); // For debugging

    try {
      const { data } = await API.post("/auth/login", form);
      console.log("Login response:", data);

      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="login-page"> 
      <div>
        <h2>WELCOME BACK . . .</h2>
      </div>
    <div>
      <h2 className="logo">Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input className="email-btn"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input className="pass-btn"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;

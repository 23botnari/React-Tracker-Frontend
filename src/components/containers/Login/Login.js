import React, { useState, useRef } from "react";
import "./Login.css";
import Logo from "./../../../assets/logo192.png";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Messages } from "primereact/messages";
import { fetchData } from "../../../helpers/apiServices";

async function loginUser(credentials) {
  try {
    const response = await fetchData("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const msgs = useRef(null);

  const errorMessage = () => {
    msgs.current.show({
      sticky: true,
      severity: "error",
      // summary: "Warning:",
      detail: "Email or Password are incorrect.",
      closable: true,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      errorMessage();
    } else {
      console.log("All is alright.");
    }

    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    navigate("/dashboard");
  }

  return (
    <div
      className="flex align-items-center justify-content-center"
      style={{
        backgroundImage: "radial-gradient(circle, #00d4ff 0%, #3e2eed 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        className="surface-card p-4 shadow-2 border-round w-full lg:w-6"
        style={{ margin: "100px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-5">
            <img src={Logo} alt="hyper" height={50} className="mb-3" />
          </div>

          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText
              id="email"
              type="text"
              placeholder="Email address"
              className="w-full mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2"
            >
              Password
            </label>
            <InputText
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Messages ref={msgs} />

            <Button
              type="submit"
              label="Sign In"
              icon="pi pi-user"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

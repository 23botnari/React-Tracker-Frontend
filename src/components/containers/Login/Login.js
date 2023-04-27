import React, { useState } from "react";
import "./Login.css";
import Logo from "./../../../assets/logo192.png"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  return fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 
export default function Login({setToken}) {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
     navigate("/dashboard")
  }
  return (
    <div className="flex align-items-center justify-content-center" >
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
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />

            <div className="flex align-items-center justify-content-between mb-6">
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"></a>
            </div>

            <Button type="submit" label="Sign In" icon="pi pi-user" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

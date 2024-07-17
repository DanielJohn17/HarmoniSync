"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
// import { FaLock, FaUser } from "react-icons/fa";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import "./login.css";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted");
    postLogin();
  };

  const postLogin = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/v1/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.message);
    }
  };

  return (
    <div className="login-main">
      <div className="login-wrapper">
        <h2 className="login-header">Login</h2>

        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="button-connect"
            >
              <FontAwesomeIcon
                icon={provider.name === "Google" ? faGoogle : faGithub}
                className="icon"
              />
              Connect with {provider.name}
            </button>
          ))}

        {session?.user && router.push("/")}
        {/* <button type="button" key={providers} className="button-connect">
          <FontAwesomeIcon icon={faGoogle} className="icon" />
          Connect with Google
        </button>
        <button className="button-connect">
          <FontAwesomeIcon icon={faGithub} className="icon" />
          Connect with Github
        </button> */}

        {/* <hr /> */}

        {/* <div className="form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="form">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <FaLock className="icon" />
        </div>

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Login
        </button>

        <div className="create-account">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/register" className="create">
              Create Account
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useHistory } from "react-router";

import "./Login.css";

export default function Login() {
  const history = useHistory();

  return (
    <div className="Login">
      <form
        onSubmit={() => {
          history.push("/trade?token=test");
        }}
      >
        <label htmlFor="username">Username</label>
        <input id="username" type="text"></input>
        <label htmlFor="username">Password</label>
        <input id="password" type="text"></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { FormInput } from "../components";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  // handleChange
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues((prev) => {
      return { ...prev, [key]: value };
    });
  }

  // onSubmit
  function onSubmit(e) {
    e.preventDefault();
    console.log(values);
    dispatch(loginUser(values));
  }

  return (
    <Wrapper className="page-center">
      <form method="post" className="form" onSubmit={onSubmit}>
        <h2>Login</h2>

        <FormInput
          type="text"
          label={"Email"}
          name={"email"}
          handleChange={handleChange}
        />
        <FormInput
          type="password"
          label={"Password"}
          name={"password"}
          handleChange={handleChange}
        />

        <button className="btn" type="submit">
          login
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* background-color: #ecdcce; */

  min-height: 100vh;

  h2 {
    margin-bottom: 1em;
  }

  .form {
    background-color: #fff;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 3em 0.5em;
    border-radius: 0.4em;
    margin-top: 5em;
    text-align: center;
  }

  button {
    margin-top: 3em;
    padding: 0.15em 2.5em;
    background: #000;
    color: #fff;
  }
`;
export default Login;

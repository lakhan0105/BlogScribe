import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { redirect, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  email: "",
  password: "",
};

function Register() {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => {
    return state.userReducer;
  });

  // run this whenever the user changes
  useEffect(() => {
    setTimeout(() => {
      if (user) {
        return navigate("/", { replace: true });
      }
    }, 1000);
  }, [user]);

  // handleChange
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues((prev) => {
      return { ...prev, [key]: value };
    });
  }

  // handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    const { first_name, email, password } = values;

    // check for empty fields
    if (!first_name || !email || !password) {
      alert("please fill all the fields!");
      return;
    }

    // call the registerUser
    dispatch(registerUser({ first_name, email, password, username: nanoid() }));
  }

  // loading
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Wrapper className="page-center">
      <form method="post" action="" className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <FormInput
          type="text"
          name={"first_name"}
          label={"First name"}
          handleChange={handleChange}
        />
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
          submit
        </button>
      </form>
    </Wrapper>
  );
}

// styling
const Wrapper = styled.div`
  border: 1px solid;
  background-color: rebeccapurple;
  min-height: 100vh;

  h2 {
    margin-bottom: 1em;
  }

  .form {
    background-color: #fff;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 2em 0.5em;
    border-radius: 0.2em;
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

export default Register;

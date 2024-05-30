import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProfileById } from "../features/profile/profileSlice";
import { Link } from "react-router-dom";

function AuthorInfo({ id }) {
  const { profiles, isLoading } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [currAuth, setCurrAuth] = useState(null);

  // we need 2 useEffects beacuse, if we include both in same useEffect, we will get inifinite network calls as getProfileById() will trigger whenever the profile changes and it is a ininite loop. we need the dispatch to run only when the id changes.
  useEffect(() => {
    dispatch(getProfileById(id));
  }, [id]);

  useEffect(() => {
    setCurrAuth(profiles[id]);
  }, [profiles, id]);

  if (!currAuth) {
    return <h2>loading...</h2>;
  }

  const { $id, userId, userName, userImg, email } = currAuth;

  return (
    <Wrapper>
      <Link to={`singleprofile/${userId}`}>
        <div className="user-img-container">
          <img src={userImg} alt="not found" />
        </div>
      </Link>

      <Link to={`singleprofile/${userId}`}>
        <p>{userName}</p>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* background-color: salmon; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.6em;
  font-family: "Roboto", sans-serif;
  font-weight: 500;

  .user-img-container {
    width: 25px;
    height: 25px;
    border: 1px solid;
    border-radius: 1em;
    margin-left: 0;
    margin-right: 0.4em;
    overflow: hidden;
  }

  p {
    font-size: 0.85rem;
  }

  p:hover {
    text-decoration: underline;
  }
`;

export default AuthorInfo;

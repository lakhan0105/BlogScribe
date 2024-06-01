import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProfileById } from "../features/profile/profileSlice";
import { getUserImgPreview } from "../features/user/userSlice";

function HomeProfileCard({ currUserId }) {
  const { profiles } = useSelector((state) => state.profileReducer);

  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(currUserId));
    setData(profiles[currUserId]);
  }, [dispatch, currUserId, profiles]);

  useEffect(() => {
    const resp = getUserImgPreview(data?.userImg);
    setImg(resp?.href);
  }, [currUserId, data]);

  return (
    <Wrapper className="home-profile-card">
      <div className="img-container">
        <img src={img} alt="not found" />
      </div>
      <div>
        <p className="name">{data?.userName}</p>
        <p className="email">{data?.email}</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  background-color: #fff;
  margin-right: 1em;
  padding: 1em;
  border-radius: 0.3em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.05);
  display: none;

  .img-container {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid;
    margin-bottom: 1em;
  }

  @media only screen and (min-width: 790px) {
    display: block;
  }
`;

export default HomeProfileCard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileById } from "../features/profile/profileSlice";
import styled from "styled-components";
import { getUserImgPreview } from "../features/user/userSlice";
import BlogsContainer from "../components/BlogsContainer";

function SingleProfile() {
  const dispatch = useDispatch();
  const id = useParams().userId;
  const { profiles } = useSelector((state) => state.profileReducer);
  const { allBlogs } = useSelector((state) => state.blogReducer);

  const [profileData, setProfileData] = useState(profiles[id]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    dispatch(getProfileById(id));
    setProfileData(profiles[id]);
    const resp = getUserImgPreview(profileData?.userImg);
    setImg(resp?.href);
  }, [profiles, id]);

  // filters blogs written by current user
  const blogsByUser = allBlogs.filter((blog) => {
    if (blog.userId === id) {
      return blog;
    }
  });

  // const { userId, userImg, userName, email } = profileData;

  return (
    <Wrapper className="page-center">
      <div className="profile-card">
        <div className="left">
          <div className="img-container">
            <img src={img} alt="not found" />
          </div>
          <div>
            <h3 className="user-name">{profileData?.userName}</h3>
            <p className="email">{profileData?.email}</p>
          </div>
        </div>
        <div className="right">
          <button>edit</button>
        </div>
      </div>

      <BlogsContainer blogsData={blogsByUser} filterTitle={"Your"} />
    </Wrapper>
  );
}

// styled
const Wrapper = styled.section`
  max-width: 700px;

  .profile-card {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 1em;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 1px 1px 5px #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4em;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .img-container {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1em;
  }
`;

export default SingleProfile;

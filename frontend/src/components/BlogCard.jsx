import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthorInfo from "./AuthorInfo";
import { getBlogImgPreview } from "../features/blog/blogSlice";

function BlogCard({ $id, userId, title, content, desc, blog_img, category }) {
  const id = $id;

  // get the blog image
  const [currImg, setCurrImg] = useState(null);
  useEffect(() => {
    const resp = getBlogImgPreview(blog_img);
    setCurrImg(resp?.href);
  }, []);

  return (
    <Wrapper className="blog-card" key={id}>
      {/* meta info */}
      {/* <div className="meta-info">{user_id}</div> */}
      <AuthorInfo id={userId} />

      {/* info */}
      <div className="info">
        <div className="left">
          <Link to={`singleblog/${id}`}>
            <h2 className="title">{title}</h2>
            {/* <p className="desc">{desc}</p> */}
          </Link>
        </div>
        <div className="right">
          <Link to={`singleblog/${id}`}>
            <div className="blog-img-container">
              <img src={currImg} alt="not found" />
            </div>
          </Link>
        </div>
      </div>

      {/* buttons container */}
      <div className="btns-cont">
        <button>save</button>
      </div>
    </Wrapper>
  );
}

// Styles
const Wrapper = styled.article`
  /* border: 1px solid #d8d8d8; */
  border-radius: 0.3em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 1em;
  /* margin-top: 1.5em; */
  margin-top: 1em;
  font-family: "Merriweather", serif;

  .meta-info {
    margin-bottom: 0.4em;
    font-size: 0.9rem;
  }

  .info {
    /* border: 1px solid; */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 0.3em;
    color: #292929;
  }

  .desc {
    font-size: 0.95rem;
  }

  .blog-img-container {
    width: 100px;
    max-height: 80px;
    margin-left: 1em;
    /* overflow: hidden; */
    /* object-fit: cover; */
  }

  button {
    z-index: 1000;
  }
`;

export default BlogCard;

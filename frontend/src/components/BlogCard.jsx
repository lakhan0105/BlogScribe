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
  border: 1px solid #d8d8d8;
  border-radius: 0.2em;
  background-color: #fff;
  padding: 1em;
  margin-top: 1.5em;
  font-family: "Merriweather", serif;

  .meta-info {
    margin-bottom: 0.4em;
    font-size: 0.9rem;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 0.3em;
  }

  .desc {
    font-size: 0.95rem;
  }

  .blog-img-container {
    width: 100px;
    height: 100px;
    margin-left: 0.7em;
    border-radius: 0.2em;
    overflow: hidden;
  }

  button {
    z-index: 1000;
  }
`;

export default BlogCard;

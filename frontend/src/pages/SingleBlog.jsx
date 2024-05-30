import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getBlog, getBlogImgPreview } from "../features/blog/blogSlice";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const dispatch = useDispatch();
  const { currBlog, isLoading } = useSelector((state) => state.blogReducer);

  const blogId = useParams().id;
  const [data, setData] = useState(null);
  const [currBlogImg, setCurrBlogImg] = useState(null);

  useEffect(() => {
    if (isLoading) {
      return <h2>Loading...</h2>;
    }
    dispatch(getBlog(blogId));
  }, [blogId]);

  useEffect(() => {
    const resp = getBlogImgPreview(currBlog?.blog_img);
    setCurrBlogImg(resp?.href);
    setData(currBlog);
  }, [currBlog]);

  if (!data) {
    return <h2>no data available</h2>;
  }

  const { $id, title, content, userId } = data;

  if (isLoading || !currBlog) {
    return <h2>Loading...</h2>;
  }

  return (
    <Wrapper className="page-center">
      <div className="single-blog">
        <div className="img-container">
          <img src={currBlogImg} alt="not found" />
        </div>
        <div className="blog-body">
          <h1 className="title">{title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  /* border: 1px solid; */

  .single-blog {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.2em;
    overflow: hidden;
    box-shadow: 1px 1px 8px #00000013;
  }

  .img-container {
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin-bottom: 1em;
  }

  .blog-body {
    padding: 1em;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 0.5em;
  }

  strong {
    font-size: 1.5rem;
    display: block;
    margin-top: 1em;
    margin-bottom: 0.2em;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.2;
    color: #2c2c2c;
  }

  .content {
  }
`;

export default SingleBlog;

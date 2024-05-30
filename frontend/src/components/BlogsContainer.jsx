import React from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";

function BlogsContainer({ blogsData, filterTitle }) {
  // if no blogs is present
  if (blogsData?.length < 1) {
    return <h2>No Blogs to display</h2>;
  }

  return (
    <Wrapper>
      <h2 className="section-title">{filterTitle} blogs</h2>
      {blogsData?.map((blog) => {
        return <BlogCard key={blog.$id} {...blog} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;

  .section-title {
    text-transform: capitalize;
  }
`;

export default BlogsContainer;

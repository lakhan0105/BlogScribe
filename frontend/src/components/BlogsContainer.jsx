import React from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";

function BlogsContainer({ allBlogs }) {
  // if no blogs is present
  if (allBlogs?.length < 1) {
    return <h2>No Blogs to display</h2>;
  }

  return (
    <Wrapper>
      {allBlogs?.map((blog) => {
        return <BlogCard key={blog.$id} {...blog} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default BlogsContainer;

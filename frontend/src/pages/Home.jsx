import React, { useEffect } from "react";
import styled from "styled-components";
import { BlogCards, FeaturedBlogs, FilterBtns } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, getFeaturedBlogs } from "../features/blog/blogSlice";
import BlogsContainer from "../components/BlogsContainer";

function Home() {
  const { user } = useSelector((state) => state.userReducer);
  const { allBlogs, isLoading, featuredBlogs } = useSelector(
    (state) => state.blogReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAllBlogs());
      dispatch(getFeaturedBlogs());
    }
  }, [user]);

  return (
    <Wrapper className="page-center">
      <FilterBtns />

      {/* BLOGS CONTAINER */}
      <BlogsContainer allBlogs={allBlogs} />

      <FeaturedBlogs featuredBlogs={featuredBlogs} isLoading={isLoading} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;

  /* gap: 2em; */
  font-family: "Merriweather", serif;

  .blogs-container {
  }
`;

export default Home;

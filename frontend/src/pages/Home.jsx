import React, { useEffect } from "react";
import styled from "styled-components";
import { BlogCards, FeaturedBlogs, FilterBtns } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, getFeaturedBlogs } from "../features/blog/blogSlice";

function Home() {
  const { user } = useSelector((state) => state.userReducer);
  const { allBlogs, isLoading, featuredBlogs } = useSelector(
    (state) => state.blogReducer
  );
  const dispatch = useDispatch();
  console.log(featuredBlogs);

  useEffect(() => {
    if (user) {
      dispatch(getAllBlogs());
      dispatch(getFeaturedBlogs());
    }
  }, [user]);

  return (
    <Wrapper className="page-center">
      <FilterBtns />
      <BlogCards blogs={allBlogs} isLoading={isLoading} />
      <FeaturedBlogs featuredBlogs={featuredBlogs} isLoading={isLoading} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;

  /* gap: 2em; */
  font-family: "Merriweather", serif;
`;

export default Home;

import React, { useEffect } from "react";
import styled from "styled-components";
import { BlogCards, FeaturedBlogs, FilterBtns } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";

function Home() {
  const { user } = useSelector((state) => state.userReducer);
  const { allBlogs } = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAllBlogs());
    }
  }, [user]);

  return (
    <Wrapper className="page-center">
      <FilterBtns />
      <BlogCards blogs={allBlogs} />
      <FeaturedBlogs />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto;
  /* gap: 2em; */
  font-family: "Merriweather", serif;
`;

export default Home;

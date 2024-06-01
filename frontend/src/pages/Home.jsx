import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BlogCards,
  FeaturedBlogs,
  FilterBtns,
  HomeProfileCard,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  // filterBtns,
  filterByCategories,
  getAllBlogs,
  getFeaturedBlogs,
} from "../features/blog/blogSlice";
import BlogsContainer from "../components/BlogsContainer";

function Home() {
  const [blogsData, setBlogsData] = useState(null);
  const [filterTitle, setFilterTitle] = useState("all");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);
  const { allBlogs, isLoading, featuredBlogs, blogsByCategories, filterBtns } =
    useSelector((state) => state.blogReducer);

  // call the getAllBlogs and getFeaturedBlogs on initial render
  useEffect(() => {
    if (user) {
      dispatch(getAllBlogs());
      dispatch(getFeaturedBlogs());
    }
  }, [user]);

  // set the blogsData and also update the blogsData based on the filters
  useEffect(() => {
    if (filterTitle === "all") {
      setBlogsData(allBlogs);
    } else {
      setBlogsData(blogsByCategories);
    }
  }, [filterTitle, allBlogs, blogsByCategories]);

  // handleFilter
  function handleFilter(e) {
    const filterName = e.target.name;
    setFilterTitle(filterName); // sets dynamic filter name

    if (e.target.name === "all") {
      setBlogsData(allBlogs);
    } else {
      dispatch(filterByCategories(filterName)); // after dispatch, the useEffect will run
      console.log(blogsData);
    }
  }

  return (
    <Wrapper className="page-center">
      <div>
        <HomeProfileCard currUserId={user?.targets[0]?.userId} />
        <FilterBtns filterBtns={filterBtns} handleFilter={handleFilter} />
      </div>

      {/* BLOGS CONTAINER */}
      <BlogsContainer blogsData={blogsData} filterTitle={filterTitle} />

      <FeaturedBlogs featuredBlogs={featuredBlogs} isLoading={isLoading} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: start;
`;

export default Home;

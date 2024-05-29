import React from "react";
import styled from "styled-components";
import FeaturedCard from "./FeaturedCard";

const data = [
  {
    id: "1",
    user_id: "1001",
    created_at: "2024-05-23T10:00:00Z",
    title: "Exploring the Mountains",
    content:
      "Today I hiked to the top of the Blue Ridge Mountains. The view was breathtaking!",
    img_url:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "2",
    user_id: "1002",
    created_at: "2024-05-22T15:30:00Z",
    title: "A Day at the Beach",
    content:
      "Spent the day relaxing by the ocean and enjoying the sun. The water was perfect!",
    img_url:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "3",
    user_id: "1003",
    created_at: "2024-05-21T08:45:00Z",
    title: "City Lights",
    content:
      "The city looks amazing at night with all the lights. Took a long walk downtown.",
    img_url:
      "https://images.unsplash.com/photo-1491897554428-130a60dd4757?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

function FeaturedBlogs({ featuredBlogs, isLoading }) {
  if (isLoading) {
    return <h2>loading...</h2>;
  }

  return (
    <Wrapper>
      <h3 className="section-title">Featured Blogs</h3>

      {featuredBlogs?.map((blog) => {
        const { $id: id, content, title, userId } = blog;
        return <FeaturedCard key={id} {...blog} />;
      })}
    </Wrapper>
  );
}

// Styles
const Wrapper = styled.div`
  margin-top: 0.2em;
  display: none;
  max-width: 200px;

  .section-title {
    font-size: 1.4rem;
    margin-bottom: 1.3em;
  }

  @media only screen and (min-width: 700px) {
    display: block;
    margin-left: 2em;
  }
`;

export default FeaturedBlogs;

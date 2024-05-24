import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

function BlogCards({ blogs }) {
  return (
    <Wrapper>
      <h1 className="section-title">All blogs</h1>

      {data.map((blog) => {
        const { id, user_id, title, content, img_url, category } = blog;

        return (
          <article className="blog-card" key={id}>
            {/* meta info */}
            <div className="meta-info">{user_id}</div>

            {/* info */}
            <div className="info">
              <div className="left">
                <Link to={`singleblog/${id}`}>
                  <h2 className="title">{title}</h2>
                  <p className="content">{content}</p>
                </Link>
              </div>
              <div className="right">
                <Link to={`singleblog/${id}`}>
                  <div className="img-container">
                    <img src={img_url} alt="not found" />
                  </div>
                </Link>
              </div>
            </div>

            {/* buttons container */}
            <div className="btns-cont">
              <button>save</button>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
}

// Styles
const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  .section-title {
    font-size: 1.6rem;
    font-weight: bolder;
  }

  .blog-card {
    border: 1px solid #d8d8d8;
    border-radius: 0.2em;
    background-color: #fff;
    padding: 1em;
    margin-top: 1.5em;
    font-family: "Merriweather", serif;
  }

  .meta-info {
    margin-bottom: 0.4em;
    font-size: 0.9rem;
  }

  .info {
    display: flex;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 0.3em;
  }

  .content {
    font-size: 0.95rem;
  }

  .img-container {
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

export default BlogCards;

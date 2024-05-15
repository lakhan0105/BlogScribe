import React from "react";
import styled from "styled-components";

const dummyBlogData = [
  {
    id: 1,
    title: "Lorem Ipsum",
    imageUrl: "https://picsum.photos/id/1/300/200",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "Dolor Sit Amet",
    imageUrl: "https://picsum.photos/id/2/300/200",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 1,
    title: "Lorem Ipsum",
    imageUrl: "https://picsum.photos/id/1/300/200",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function LandingFeatured() {
  return (
    <Wrapper>
      <h2 className="section-heading">Featured blogs</h2>

      <div className="featured-cards">
        {dummyBlogData.map((data, index) => {
          const { id, title, imageUrl, description: desc } = data;
          return (
            <article className="card" key={index}>
              <div className="img-container">
                <img src={imageUrl} alt={title} />
              </div>
              <div className="info">
                <h3 className="title">{title}</h3>
                <p className="desc">{desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .section-heading {
    margin-top: 2.5em;
    text-align: center;
  }

  .featured-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card {
    background-color: #fff;
    border-radius: 0.2em;
    overflow: hidden;
    box-shadow: 2px 2px 10px #36363624;
    width: 75%;
    max-width: 350px;
    margin-top: 3em;
  }

  .img-container {
    width: 100%;
    height: 170px;
  }

  .info {
    padding: 0.5em;
    font-family: "Merriweather", serif;
  }

  .title {
    margin-bottom: 0.3em;
    font-family: "Merriweather", serif;
  }

  .desc {
    font-family: "Merriweather", serif;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  @media only screen and (min-width: 700px) {
    .featured-cards {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1em;
      justify-content: space-evenly;
      margin: 0 auto;
      align-content: flex-start;
    }
  }
`;

export default LandingFeatured;

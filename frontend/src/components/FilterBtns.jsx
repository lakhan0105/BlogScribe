import React from "react";
import styled from "styled-components";

const data = [
  "All",
  "Technology",
  "Health",
  "Finance",
  "Lifestyle",
  "Travel",
  "Education",
  "Entertainment",
  "Sports",
  "Business",
  "Food",
  "DIY",
  "Science",
  "Art",
  "Fashion",
  "News",
  "Reviews",
  "Opinion",
  "Interviews",
  "Guides",
  "Tips",
  "Tutorials",
  "Trending",
  "Latest",
  "Popular",
];

function FilterBtns() {
  return (
    <Wrapper>
      {/* <h2 className="section-title">#filters</h2> */}
      {data.map((btn, index) => {
        return <button key={index}>{btn}</button>;
      })}
    </Wrapper>
  );
}

// styled
const Wrapper = styled.div`
  margin-top: 3.5em;
  margin-right: 1em;
  font-family: "Roboto", sans-serif;
  max-width: 150px;
  display: none;

  .section-title {
    margin-bottom: 0.5em;
    font-size: 1.2rem;
  }

  button {
    margin-right: 0.3em;
    margin-bottom: 0.3em;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    padding: 0.1em 0.2em;
    border: 1px solid #cecdcd;
    border-radius: 0.2em;
  }

  button:hover {
    border-color: #a7a7a7;
    box-shadow: 0px 0px 1px #d6d6d6;
  }

  @media only screen and (min-width: 900px) {
    display: block;
  }
`;

export default FilterBtns;

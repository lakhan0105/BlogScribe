import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function FeaturedCard({ id, title }) {
  return (
    <Wrapper>
      <Link to={`singleblog/${id}`}>
        <h3 className="title">{title}</h3>
      </Link>
    </Wrapper>
  );
}

// styles
const Wrapper = styled.article`
  border-top: 1px solid #cccccc;
  padding-top: 0.5em;
  margin-bottom: 1em;
  font-family: "Merriweather", serif;
  font-size: 0.9rem;
  font-weight: bolder;

  a:hover {
    text-decoration: underline;
  }
`;

export default FeaturedCard;

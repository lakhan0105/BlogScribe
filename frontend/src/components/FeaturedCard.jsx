import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function FeaturedCard({ $id, title }) {
  const id = $id;
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
  padding-top: 1em;
  margin-bottom: 1em;
  /* font-family: "Merriweather", serif; */
  font-family: "Roboto", sans-serif;
  color: #292929;

  font-size: 0.86rem;
  font-weight: 400;

  a:hover {
    text-decoration: underline;
  }
`;

export default FeaturedCard;

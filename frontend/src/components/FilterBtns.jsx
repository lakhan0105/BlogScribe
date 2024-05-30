import React from "react";
import styled from "styled-components";

function FilterBtns({ filterBtns, handleFilter }) {
  return (
    <Wrapper>
      {/* <h2 className="section-title">filters</h2> */}
      <div className="filter-btns">
        {filterBtns?.map((btn, index) => {
          return (
            <button key={index} name={btn} onClick={handleFilter}>
              #{btn}
            </button>
          );
        })}
      </div>
    </Wrapper>
  );
}

// styled
const Wrapper = styled.div`
  margin-top: 3.5em;
  margin-right: 1em;
  font-family: "Roboto", sans-serif;
  width: 200px;
  display: none;

  .section-title {
    margin-bottom: 0.5em;
    font-size: 1.5rem;
  }

  .filter-btns {
    /* display: flex; */
  }

  button {
    margin-bottom: 0.5em;
    font-size: 1rem;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    padding: 0.1em 0.2em;
    border: 1px solid #cecdcd;
    border-radius: 0.2em;
    display: block;
    border: none;
    background-color: transparent;
    text-transform: capitalize;
  }

  button:hover {
    text-decoration: underline;
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

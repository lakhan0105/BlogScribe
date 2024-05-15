import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const dummyData = [
  {
    id: 1,
    title: "Lorem Ipsum lorem dewbnuod dwebi ewoqbeiohgr fnieownf",
    imageUrl: "https://source.unsplash.com/random/150x150",
  },
  {
    id: 2,
    title: "Dolor Sit Amet",
    imageUrl: "https://source.unsplash.com/random/150x150",
  },
  {
    id: 3,
    title: "Consectetur Adipiscing Elit",
    imageUrl: "https://source.unsplash.com/random/150x150",
  },
];

function LandingHero() {
  const [currItem, setCurrItem] = useState(0);

  // nextSlide
  function nextSlide() {
    if (currItem >= dummyData.length - 1) {
      setCurrItem(0);
    } else {
      setCurrItem((prev) => prev + 1);
    }
  }

  // prevSlide
  function prevSlide() {
    if (currItem <= 0) {
      setCurrItem(dummyData.length - 1);
    } else {
      setCurrItem((prev) => prev - 1);
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     nextSlide();
  //   }, 10000);
  // }, [currItem]);

  return (
    <Wrapper>
      <div className="slider">
        {dummyData.map((data, index) => {
          const { id, title, imageUrl } = data;
          return (
            <article
              key={id}
              className="slide-article"
              style={{
                backgroundImage: `url(${imageUrl})`,
                transform: `translateX(${100 * (index - currItem)}%)`,
              }}
            >
              <h3 className="title">{title}</h3>

              {/* buttons */}
              <button className="left-btn nav-btn" onClick={prevSlide}>
                <FaAngleLeft />
              </button>
              <button className="right-btn nav-btn" onClick={nextSlide}>
                <FaAngleRight />
              </button>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
}

// landing hero
const Wrapper = styled.section`
  margin-bottom: 2em;
  transition: all 0.3s ease-in-out;

  .slider {
    border-radius: 0.5em;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    height: 400px;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .slide-article {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 2;
    transition: all 0.3s ease-in-out;
  }

  // overlay
  .slide-article::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    content: "";
    opacity: 0.4;
  }

  .title {
    position: absolute;
    bottom: 2rem;
    left: 1rem;
    color: #fff;
    z-index: 100;
    font-size: 2rem;
    max-width: 90%;
  }

  .nav-btn {
    position: absolute;
    bottom: 0.2rem;
    font-size: 1.3rem;
    display: flex;
    border: none;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
  }

  .left-btn {
    left: 0.65rem;
  }

  .right-btn {
    left: 1.8rem;
  }
`;

export default LandingHero;

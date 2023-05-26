import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = ({ data, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onChange = (index) => {
    setActiveIndex(index);
  };

  useEffect(function () {
    setActiveIndex(0)
  }, [data])

  return (
    <CarouselContainer>
      <Carousel
        centerMode={true}
        infiniteLoop
        useKeyboardArrows
        dynamicHeight
        autoPlay={true}
        emulateTouch
        showStatus={true}
        showIndicators={true}
        showThumbs={true}
        centerSlidePercentage={40}
        selectedItem={activeIndex}
        onChange={onChange}>
        {data ? data.map((blog, index) => (
          <ImageContainer
            onClick={() => onClick(blog)}
            key={index}
            className={activeIndex === index ? ' active' : ''}
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${blog.images[0]}`}
              alt=""
              width="400"
            />
            <Caption>{blog.blogName}</Caption>
          </ImageContainer>
        )) : []}
      </Carousel>
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  padding-top: 3rem;
  width: 60%;
  margin: auto;
  margin-top: 5rem;
  overflow-y: visible !important; 
  overflow-x: hidden !important;

  * {
    overflow: visible !important;
  }

  .carousel .slide {
    background: none;
  }

  .carousel .control-dots .dot {
    background: gray;
  }

  .carousel .thumbs-wrapper,
  .carousel .thumbs {
    display: flex;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  filter: brightness(45%);
  transition: all 0.5s, filter 0.5s;
  z-index: 0;
  
  height: 400px;
  img{
    height: 100%;
  }

  /* add pointer events and cursor styling */
  pointer-events: none;
  cursor: default;

  &.active {
    position: relative;
    z-index: 1;
    filter: brightness(100%);
    transform: scaleX(1.1) translateY(-3rem);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    /* update pointer events and cursor styling for active */
    pointer-events: auto;
    cursor: pointer;
  }
`;





const Caption = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 100%;
  padding: 10px;
  text-align: center;
`;

export default ImageSlider;

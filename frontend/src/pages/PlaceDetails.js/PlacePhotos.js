import React from 'react'
import PropTypes from 'prop-types';
import Slider from "react-slick";
import styled from 'styled-components';

const PlacePhotos = ({ list }) => {
  const settings = {
    dots: true
  }

  const Container = styled.div`
    padding: 40px;

    div {
      outline: none;
    }

    .slick-slide {
      max-height: 600px;
    }

    .slick-slider .slick-arrow:before {
      color: #419be0;
    }

    .slick-slide img {
      margin: auto;
      max-width: 100%;
      height: auto;
      outline: none;
    }
  `

  return (
    <Container>
      <Slider {...settings}>
        {list.map((item, index) => (
          <div key={index}>
            <img src={item.src} alt="photos-place"/>
          </div>
        ))}
      </Slider>
    </Container>
  )
}
PlacePhotos.propTypes = {
  list: PropTypes.array.isRequired
}

export default PlacePhotos

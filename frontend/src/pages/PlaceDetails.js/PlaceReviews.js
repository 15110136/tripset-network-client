import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from 'components/Avatar';

const PlaceReviews = ({ list }) => {
  const Item = styled.div`
    display: flex;
    padding: 0 20px;
    border-top: 1px solid ${p => p.theme.colors.primary.main};
    border-bottom: 1px solid ${p => p.theme.colors.primary.main};
    background: ${p => p.theme.colors.white}
  `
  const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 150px;
    padding: 20px 0;
  `

  const RightSide = styled.div`
    span {
      float: right;
      opacity: .5
    }
  `

  const NoReview = styled.h1`
    font-weight: bold;
    text-align: center;
  `

  const Title = styled.h2`
    font-weight: bold;
  `

  const Name = styled.span`
    font-weight: bold;
    text-align: center;
  `

  const Rating = styled.div`
    img {
      width: 15px;
    }
  `
  if (!list[0]) return <NoReview>Chưa có review nào cả</NoReview>
  
  return (
    <div style={{ margin: '20px 0' }}>
      <Title>Review hàng đầu</Title>
      <div>
        {list.map((item, index) => (
          <Item key={index}>
            <LeftSide>
              <a href={item.author_url}>
                <Avatar image={item.profile_photo_url} />
              </a>
              <Name>
                {item.author_name}
                  <Rating>{item.rating}
                    <img src="/favourites.png" alt="rating"/>
                  </Rating>
              </Name>
            </LeftSide>
            <RightSide>
              <p>
                {item.text}
              </p>
              <span>{item.relative_time_description}</span>
            </RightSide>
          </Item>
        ))}
      </div>
    </div>
  )
}

PlaceReviews.propTypes = {
  list: PropTypes.array.isRequired
}

export default PlaceReviews

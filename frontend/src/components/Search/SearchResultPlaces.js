import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router-dom';

import { Spacing } from 'components/Layout';
import { A } from 'components/Text';

import * as Routes from 'routes';

const Root = styled.div`
  width: 100%;
  max-height: 350px;
  min-height: 40px;
  overflow: auto;
  position: absolute;
  top: 50px;
  font-size: ${p => p.theme.font.size.xs};
  box-shadow: ${p => p.theme.shadows.sm};
  background-color: ${p => p.theme.colors.white};
`;

const StyledA = styled(A)`
  display: block;

  &:hover {
    background-color: ${p => p.theme.colors.grey[100]};
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${p => p.theme.spacing.xs};
`;

const Name = styled.div`
  font-weight: ${p => p.theme.font.weight.bold};
`;

const UserName = styled.div`
  font-size: ${p => p.theme.font.size.xxs};
`;

const NoSearchResult = styled.div`
  text-align: center;
  padding: ${p => p.theme.spacing.xs};
  color: ${p => p.theme.colors.text.main};
`;

/**
 * Displays search result, meant to be used in Search component
 */
const SearchResultPlaces = ({ places }) => {
  if (places.length < 1) {
    return (
      <Root>
        <NoSearchResult>Không tìm thấy địa điểm phù hợp</NoSearchResult>
      </Root>
    );
  }

  return (
    <Root>
      {places.map((place, index) => (
        <StyledA
          key={index}
          to={generatePath(Routes.PLACE_DETAILS, { placeId: place.place_id })}
        >
          <Item>
            <Spacing left="xs">
              <Name>{place.name}</Name>
              <UserName>Rating {place.rating}</UserName>
            </Spacing>
          </Item>
        </StyledA>
      ))}
    </Root>
  );
};

SearchResultPlaces.propTypes = {
  places: PropTypes.array.isRequired
};

export default SearchResultPlaces;

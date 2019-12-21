import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { H1, H2 } from 'components/Text';
import { Spacing } from 'components/Layout';
import { NotFoundIcon } from 'components/icons';
import { Button } from 'components/Form';
import { Loading } from 'components/Loading';
import { Mutation } from 'react-apollo';
import { UPDATE_INFO_USER, GET_AUTH_USER } from 'graphql/user';
import { generatePath } from 'react-router-dom';
import * as Routes from 'routes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${p => p.theme.spacing.lg};
  padding: 0 ${p => p.theme.spacing.sm};
  text-align: center;
`;

const Active = styled.div`
  max-width: 150px;
`

const NotFoundProfile = ({ history, userId }) => {

  const handleClickActiveButton = async uploadInfo => {
    let { data } = await uploadInfo()
    window.history.pushState('', '',
      generatePath(Routes.USER_PROFILE, { username: data.uploadInfo.username }))
  }
  return (
    <Mutation
      mutation={UPDATE_INFO_USER}
      variables={{ input: {
        id: userId,
        isActive: false
      } }}
      refetchQueries={() => [{ query: GET_AUTH_USER }]}
    >
      {(uploadInfo, { loading, error: apiError }) => (
        <Root>
          <H1>Oops!</H1>
          <Spacing top="sm" bottom="md">
            <H2>Tài khoản của bạn đã bị khoá!!!</H2>
          </Spacing>
          <NotFoundIcon width="100" />
          <Spacing bottom="md" />
          <H2>Nhấn nút để kích hoạt tài khoản</H2>
          <Spacing bottom="md" />
          <Active>
            <Button fullWidth type="button"
              onClick={() => handleClickActiveButton(uploadInfo)}
            >
              {loading ? <Loading color={"white"}/> : "Active"}
            </Button>
          </Active>
        </Root>
      )}
    </Mutation>
  )
}

NotFoundProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};


export default NotFoundProfile

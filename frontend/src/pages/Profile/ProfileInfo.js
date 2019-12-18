import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, generatePath } from 'react-router-dom';
import { useSubscription } from '@apollo/react-hooks';

import { IS_USER_ONLINE_SUBSCRIPTION } from 'graphql/user';

import { H1 } from 'components/Text';
import { Spacing } from 'components/Layout';
import Follow from 'components/Follow';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileCoverUpload from './ProfileCoverUpload';
import ProfilePopup from './ProfilePopup';

import { useStore } from 'store';

import * as Routes from 'routes';
import Modal from 'components/Modal';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -140px;
`;

const FullName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${p => p.theme.spacing.sm};
  position: relative;

  ${H1} {
    font-size: ${p => p.theme.font.size.lg};
  }

  @media (min-width: ${p => p.theme.screen.md}) {
    ${H1} {
      font-size: ${p => p.theme.font.size.xl};
    }
  }
`;

const FollowAndMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${p => p.theme.spacing.sm};
`;

const Message = styled(Link)`
  text-decoration: none;
  font-size: ${p => p.theme.font.size.xs};
`;

const Online = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${p => p.theme.colors.success};
  margin-left: ${p => p.theme.spacing.sm};
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${p => p.theme.font.size.xs};
  margin-top: ${p => p.theme.spacing.sm};
`;

const List = styled.div`
  padding: 0 ${p => p.theme.spacing.xs};
  color: ${p => p.theme.colors.grey[800]};
  white-space: nowrap;

  @media (min-width: ${p => p.theme.screen.md}) {
    padding: 0 ${p => p.theme.spacing.lg};
  }
`;

const Edit = styled.div`
  font-size: ${p => p.theme.font.size.sm};
  padding: 5px;
  border: 1px solid ${p => p.theme.colors.border.main};
  cursor: pointer;
`

/**
 * Renders user information in profile page
 */
const ProfileInfo = ({ user }) => {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
  const [{ auth }] = useStore();

  const { data, loading } = useSubscription(IS_USER_ONLINE_SUBSCRIPTION, {
    variables: { authUserId: auth.user.id, userId: user.id },
  });

  let isUserOnline = user.isOnline;
  if (!loading && data) {
    isUserOnline = data.isUserOnline.isOnline;
  }

  const openInfoModal = () => {
    setIsInfoPopupOpen(true)
  }

  const closeModal = () => {
    setIsInfoPopupOpen(false)
  }

  const onChangeInfo = name => {
    closeModal()
    window.history.pushState('', '', generatePath(Routes.USER_PROFILE, { username: name }))
  }

  return (
    <Root>
      <ProfileCoverUpload
        userId={user.id}
        coverImage={user.coverImage}
        coverImagePublicId={user.coverImagePublicId}
      />

      <ProfileImage>
        <ProfileImageUpload
          userId={user.id}
          image={user.image}
          imagePublicId={user.imagePublicId}
          username={user.username}
        />

        <FullName>
          <H1>{user.fullName}</H1>

          {isUserOnline && auth.user.id !== user.id && <Online />}

          {auth.user.id !== user.id && (
            <FollowAndMessage>
              <Follow user={user} />

              <Spacing left="sm" />
              <Message to={generatePath(Routes.MESSAGES, { userId: user.id })}>
                Message
              </Message>
            </FollowAndMessage>
          )}
          {auth.user.id === user.id && (
            <div>
              <Spacing left="md">
                <Edit onClick={() => openInfoModal()}>
                  Chỉnh sửa thông tin
                </Edit>
              </Spacing>
              <Modal open={isInfoPopupOpen} onClose={closeModal}>
                <ProfilePopup user={user} name={onChangeInfo}/>
              </Modal>
            </div>
          )}
        </FullName>
      </ProfileImage>

      <Info>
        <List>
          <b>{user.posts.length} </b> posts
        </List>
        <List>
          <b>{user.followers.length} </b> followers
        </List>
        <List>
          <b>{user.following.length} </b> following
        </List>
      </Info>
    </Root>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfo;

import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Button, InputText } from 'components/Form';
import Checkbox from 'components/Checkbox';
import { Mutation } from 'react-apollo';
import { UPDATE_INFO_USER, GET_AUTH_USER } from 'graphql/user';

import * as Routes from 'routes';
import { Loading } from 'components/Loading';

const Container = styled.div`
  max-height: ${p => '600px'};
  overflow-y: ${p => 'auto'};
  max-width: 1300px;
  background-color: ${p => p.theme.colors.white};
  z-index: inherit;

  @media (min-width: ${p => p.theme.screen.md}) {
    flex-direction: ${p => 'row'};
    max-height: ${p => 'auto'};
    overflow-y: inherit;
  }
`;

const Title = styled.h2`
  color: ${p => p.theme.colors.text.main};
  text-align: center;
  border-bottom: 1px solid ${p => p.theme.colors.border.main};
`

const FormContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
`

const Item = styled.div`
  margin: 10px 30px;
`

const ProfilePopup = ({ name, user }) => {
  const [password, setPassword] = useState('')
  const [isLock, setIsLock] = useState(false)
  const [_user, setUser] = useState(null)

  useEffect(() => {
    setUser(user)
  }, [user])

  const handleSubmit = async (evt, uploadInfo) => {
    evt.preventDefault()
    let { data } = await uploadInfo()
    name(data.uploadInfo.username)
  }

  const handleCheckboxChange = (evt) => {
    setIsLock(evt.target.checked)
  }

  const handleChangeInputPassword = (evt) => {
    setPassword(evt.target.value)
  }

  const handleChangeInput = (evt) => {
    evt.persist()
    setUser(prev => ({
      ...prev,
      [evt.target.name]: evt.target.value
    }))
  }

  return (
    <Mutation
      mutation={UPDATE_INFO_USER}
      variables={{ input: {
        id: (_user && _user.id) || '',
        username: (_user && _user.username) || '',
        email: (_user && _user.email) || '',
        fullName: (_user && _user.fullName) || ''
      } }}
      refetchQueries={() => [{ query: GET_AUTH_USER }]}
    >
      {(uploadInfo, { loading, error: apiError }) => {
        return (
          <Container>
            <Title>Chỉnh sửa thông tin cá nhân</Title>
            <form onSubmit={evt => handleSubmit(evt, uploadInfo)}>
              {_user && (
                <FormContainer>
                  <div>
                    <Item>
                      <label>Full name</label>
                      <InputText
                        type="text"
                        name="fullName"
                        value={_user.fullName}
                        onChange={handleChangeInput}
                      />
                    </Item>
                    <Item>
                      <label>Username</label>
                      <InputText
                        type="text"
                        name="username"
                        value={_user.username}
                        onChange={handleChangeInput}
                      />
                    </Item>
                  </div>
                  <div>
                    <Item>
                      <label>Email</label>
                      <InputText
                        type="text"
                        name="email"
                        value={_user.email}
                        onChange={handleChangeInput}
                      />
                    </Item>
                    <Item>
                      <label>Password</label>
                      <InputText
                        type="text"
                        name="password"
                        value={password}
                        onChange={handleChangeInputPassword}
                      />
                    </Item>
                  </div>
                </FormContainer>
              )}
              <div style={{ marginBottom: 20, marginLeft: 30 }}>
                <label>
                  <Checkbox checked={isLock} onChange={handleCheckboxChange} />
                  <span style={{ marginLeft: 8 }}>Khoá tài khoản này</span>
                </label>
              </div>
              <Button fullWidth type="submit">
                {loading ? <Loading color={"white"}/> : "Save"}
              </Button>
            </form>
          </Container>
        )
      }}
    </Mutation>
  )
}

export default ProfilePopup

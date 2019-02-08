import React from 'react'
import styled from '@emotion/styled'

import Avatar from './Avatar'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
`
const Name = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
  font-weight: 900;
  margin-top: 30px;
  margin-bottom: 0;
`

const Title = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
`

const Profile = ({ name, title }) => (
  <Wrapper>
    <Avatar />
    <Name>{name}</Name>
    <Title>
      {'< '}
      {title}
      {' />'}
    </Title>
  </Wrapper>
)

export default Profile

import styled from '@emotion/styled'

import MyPhoto from '../images/my-image.jpg'

const Avatar = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
`

Avatar.defaultProps = {
  src: MyPhoto,
  alt: 'Genesis Gabiola Image',
  width: '150px',
  height: '150px',
}

export default Avatar

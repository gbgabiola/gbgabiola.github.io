import styled from '@emotion/styled'

const Content = styled.div`
  width: ${props => props.width};
  max-width: 100%;
  margin: 0 auto;
  padding: 60px ${props => props.theme.contentPadding};
  min-height: calc(100vh - 160px);
`

Content.defaultProps = {
  width: '800px',
}

export default Content

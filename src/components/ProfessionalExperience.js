import React from 'react'
import styled from '@emotion/styled'

const Experience = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    margin: 0;
    line-height: 1.5;
    color: ${props => props.theme.colors.highlighted};

    & + p {
      color: ${props => props.theme.colors.highlighted};
      font-style: italic;
      margin: 0 0 1em 0;
    }
  }
`

const ProfessionalExperience = ({ company, info, description }) => (
  <Experience>
    <h3>{company}</h3>
    <p>{info}</p>
    <p>{description}</p>
  </Experience>
)

export default ProfessionalExperience

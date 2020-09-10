import React, { Fragment } from 'react'

import SEO from '../components/seo'

const NotFoundPage = () => (
  <Fragment>
    <SEO title="404: Not found" />
    <h1>PAGE NOT FOUND</h1>
    <p>You just hit a route that doesn&apos;t exist... the sadness.</p>
  </Fragment>
)

export default NotFoundPage

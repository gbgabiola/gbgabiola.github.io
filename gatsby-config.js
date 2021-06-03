module.exports = {
  siteMetadata: {
    title: `Genesis Gabiola - Front-End Developer`,
    description: `Genesis Gabiola, a Front-end Developer, builds aesthetic and performant websites and web applications for your business or personal needs.`,
    author: `Genesis Gabiola`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `genesisgabiola-portfolio`,
        short_name: `genesisgabiola`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FF3B3F`,
        display: `minimal-ui`,
        icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Lato:400,400i,700,700i,900'],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}

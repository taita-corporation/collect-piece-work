require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteTitle: 'collect piece work',
    siteTitleDefault: 'ファッションを通してモノと人、人と人をつなぐ',
    siteUrl: 'https://shopify-demo.gatsbyjs.com',
    hrefLang: 'en',
    siteDescription:
      'A Gatsby starter using the latest Shopify plugin showcasing a store with product overview, individual product pages, and a cart.',
    siteImage: '/default-og-image.jpg',
    twitter: '@gatsbyjs',
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        apiKey: process.env.SHOPIFY_API_KEY,
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-postcss',
    'gatsby-transformer-remark',
    'gatsby-plugin-less',
    // Add your Google Analytics ID to the .env file to enable
    // Otherwise, this plugin can be removed
    process.env.GOOGLE_ANALYTICS_ID && {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_ID,
        ],
      },
    },
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        // The project environment to read from. Defaults to the primary environment:
        environment: 'main',
        previewMode: false,
        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,
      },
    },
  ].filter(Boolean),
};

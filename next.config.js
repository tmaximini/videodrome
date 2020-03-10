const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'videodrome-react',
]);
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([withTM, withCSS]);

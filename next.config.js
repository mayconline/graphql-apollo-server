/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  webpack: config => {
    config.module.rules.push({
      test: /\schema.(ts|js)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    });

    return config;
  },
};

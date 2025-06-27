//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    // Add webpack aliases to resolve the web-ui library's internal path mappings
    config.resolve.alias = {
      ...config.resolve.alias,
      '@utils': path.resolve(__dirname, '../../libs/web-ui/src/lib/utils'),
      '@ui': path.resolve(__dirname, '../../libs/web-ui/src/lib/components/ui'),
      '@constants': path.resolve(
        __dirname,
        '../../libs/web-ui/src/lib/constants'
      ),
    };
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);

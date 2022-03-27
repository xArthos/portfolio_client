// Modules
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');
const config = require('./config.d.ts');
const path = require('path');

module.exports = withPlugins(
    [
        [withCustomBabelConfigFile, { babelConfigFile: path.resolve('./babel.config.js') }],
        [optimizedImages, { handleImages: ['jpeg', 'png', 'ico'] }]
    ],
    {
        webpack: (config) => {
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack']
            });

            return config;
        },

        serverRuntimeConfig: config.serverRuntimeConfig,
        publicRuntimeConfig: config.publicRuntimeConfig,
        images: {
            domains: [
                'localhost'
            ]
        }
    }
);
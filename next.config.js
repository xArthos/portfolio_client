// Modules
import path from 'path';
import withPlugins from 'next-compose-plugins';
import optimizedImages from 'next-optimized-images';
import withCustomBabelConfigFile from 'next-plugin-custom-babel-config';

// Config
import config from './config.d.ts';

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
// Modules
const config = require('./config.d.ts');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = {
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
    },
    env: {
        customKey: 'my-value',
    },
    basePath: '',
};

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            ...nextConfig
        }
    }

    return {
        ...nextConfig
    }
};
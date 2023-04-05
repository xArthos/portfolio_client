// ** Modules
const config = require('./config.d.ts');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    sw: 'service-worker.js',
    disable: process.env.NODE_ENV === 'development'
});

const nextConfig = withPWA({
    reactStrictMode: true,
    webpack: (config, options) => {
        if (!options.isServer) {
            const workboxPlugin = new InjectManifest({
                swSrc: './src/service-worker/index.ts',
                swDest: '../public/service-worker.js',
                // In dev, exclude everything.
                // This avoids irrelevant warnings about chunks being too large for caching.
                // In non-dev, use the default `exclude` option, don't override.
                ...(options.dev ? { exclude: [/./] } : undefined)
            });

            if (options.dev) {
                // Suppress the 'InjectManifest has been called multiple times' warning by reaching into
                // the private properties of the plugin and making sure it never ends up in the state
                // where it makes that warning.
                // https://github.com/GoogleChrome/workbox/blob/v6/packages/workbox-webpack-plugin/src/inject-manifest.ts#L260-L282
                Object.defineProperty(workboxPlugin, 'alreadyCalled', {
                    get() {
                        return false;
                    },
                    set() {
                        // do nothing; the internals try to set it to true, which then results in a warning
                        // on the next run of webpack.
                    }
                });
            };

            config.plugins.push(workboxPlugin);
        };

        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find(
            (rule) => rule.test && rule.test.test?.('.svg')
        );

        config.module.rules.push({
            oneOf: [
                // Reapply the existing rule, but only for svg imports ending in ?url
                {
                    ...fileLoaderRule,
                    test: /\.svg$/i,
                    resourceQuery: /url/, // *.svg?url
                },
                // Convert all other *.svg imports to React components
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    resourceQuery: { not: /url/ }, // exclude if *.svg?url
                    use: ['@svgr/webpack'],
                },
            ],
        });

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

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
    basePath: ''
});

module.exports = withPWA((phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            ...nextConfig
        };
    };

    return {
        ...nextConfig
    };
});
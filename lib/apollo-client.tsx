// Modules
import merge from 'deepmerge';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';
import { onError } from '@apollo/link-error';
import { useMemo } from 'react';
import { AppProps } from 'next/app';
import { createUploadLink } from 'apollo-upload-client';
import { IncomingHttpHeaders } from 'http';
import { ApolloLink, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
    // isomorphic fetch for passing the cookies along with each GraphQL request
    const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
        const response = await fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                'Access-Control-Allow-Origin': '*',
                // here we pass the cookie along for each request
                Cookie: headers?.cookie ?? '',
            },
        });
        return response;
    };

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    )
                if (networkError)
                    console.log(
                        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
                    )
            }),
            // This uses apollo-link-http under the hood, so all the options here come from that package
            createUploadLink({
                uri: 'https://serverxarthos.vercel.app/graphql/',
                // Make sure that CORS and cookies work
                fetchOptions: {
                    mode: 'cors' // 'no-cors'
                },
                credentials: 'include',
                fetch: enhancedFetch,
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Access-Control-Allow-Origin': 'http://localhost:3000',
                //     'Access-Control-Allow-Credentials': true
                // }
            })
        ]),
        cache: new InMemoryCache()
    });
};

type InitialState = NormalizedCacheObject | undefined

interface IInitializeApollo {
    headers?: IncomingHttpHeaders | null
    initialState?: InitialState | null
}

export const initializeApollo = (
    { headers, initialState }: IInitializeApollo = {
        headers: null,
        initialState: null
    }
) => {
    const _apolloClient = apolloClient ?? createApolloClient(headers);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                )
            ]
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    };

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
};

export const addApolloState = (
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: AppProps['pageProps']
) => {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    };

    return pageProps;
};

export const useGetApolloClient = (pageProps: AppProps['pageProps']) => {
    const state = pageProps[APOLLO_STATE_PROP_NAME]
    const store = useMemo(() => initializeApollo({ initialState: state }), [state]);

    return store;
};
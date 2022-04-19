// Modules
import merge from 'deepmerge';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';
import { onError } from '@apollo/link-error';
import { useMemo } from 'react';
import { AppProps } from 'next/app';
import { setContext } from '@apollo/client/link/context';
import { ParsedUrlQuery } from 'querystring';
import { createUploadLink } from 'apollo-upload-client';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { GetServerSidePropsResult, PreviewData } from 'next';
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';
import { ApolloLink, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

// Apollo
import { getCurrentUserQuery } from './utils/userDataUtils';

// Config


// type CustomGetServerSideProps<
//     P extends { [key: string]: any } = { [key: string]: any },
//     Q extends ParsedUrlQuery = ParsedUrlQuery
//     > = (context: GetServerSidePropsContext<Q>) => Promise<GetServerSidePropsResult<P>>

type GetServerSidePropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
    req: IncomingMessage & {
        cookies: NextApiRequestCookies
    }
    res: ServerResponse
    params?: Q
    query: ParsedUrlQuery
    preview?: boolean
    previewData?: PreviewData
    resolvedUrl: string
    locale: string // This is where the magic happens.
    locales?: string[]
    defaultLocale?: string
}

const APOLLO_STATE_PROP_NAME = 'devArthosApolloState';

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
                Cookie: headers?.cookie ?? ''
            }
        });

        return response;
    };

    const httpLink = createUploadLink({
        uri: 'https://serverxarthos.vercel.app/graphql',
        // Make sure that CORS and cookies work
        fetchOptions: {
            mode: 'cors' // 'no-cors'
        },
        credentials: 'include',
        fetch: enhancedFetch
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('devArthosPortfolio');

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) => {
                        console.error(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        );
                    }
                    )
                if (networkError)
                    console.error(
                        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
                    )
            }),
            // This uses apollo-link-http under the hood, so all the options here come from that package
            authLink.concat(httpLink)
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
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo({ initialState: state }), [state]);

    return store;
};

// Use Apollo for (Incremental) Static Site Generation - TO DEVELOP
const client = initializeApollo()

// export const getStaticPaths = async () => {
//     // here we use the Apollo client to retrieve the currentUser
//     const {
//         data: { allProducts }
//     } = await client.query<AllProductsQuery>({ query: ALL_PRODUCTS_QUERY });
//     const ids = allProducts?.map((product) => product?.id);
//     const paths = ids?.map((id) => ({ params: { id } }));

//     return {
//         paths,
//         fallback: true
//     };
// };

interface IStaticProps {
    params: { id: string | undefined }
};

export const getStaticProps = async ({ params: { id } }: IStaticProps) => {
    if (!id) {
        throw new Error('Parameter is invalid')
    };

    try {
        const {
            data: { Product: product },
        } = await client.query({
            query: getCurrentUserQuery,
            variables: { id }
        });

        return {
            props: {
                id: product?.id,
                title: product?.name
            },
            revalidate: 60
        };
    } catch (err) {
        return {
            notFound: true
        };
    };
};

// Use Apollo for Server-Side Rendering
// TODO: #3 Set server side props for sending cookies between different domains
export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    // pass along the headers for authentication
    const client = initializeApollo({ headers: context?.req?.headers })
    try {
        await client.query({
            query: getCurrentUserQuery
        });

        return addApolloState(client, {
            props: {}
        });
    } catch {
        return {
            props: {},
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    };
};
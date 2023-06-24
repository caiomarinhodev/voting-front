import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Voting App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open%20Sans:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
